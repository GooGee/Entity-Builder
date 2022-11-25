import {
    OapiReference,
    OapiSchema,
    OapiSchemaComposition,
    OapiSchemaObject,
    makeSchemaObject,
    makeSchemaComposition,
    CompositionKind,
    isSchemaColumn,
    OapiType,
} from "@/Model/Oapi"
import { makeReferenceEmpty } from "./makeReference"
import makeSchemaTypeFormat from "./makeSchemaTypeFormat"

/**
 * only includes Wu that has no WuParameter
 */
export default function makeSchemaWu(
    wu: LB.Wu,
    vivm: Map<number, LB.Variable>,
    wiczzm: Map<number, LB.Column[]>,
    wiwczzm: Map<number, LB.WuChild[]>,
    wiwm: Map<number, LB.Wu>,
): OapiReference | OapiSchemaComposition | OapiSchemaObject {
    const wiwpzzm: Map<number, LB.WuParameter[]> = new Map()
    const argumentzz: (OapiReference | OapiSchema)[] = []
    const wpiam: Map<number, OapiReference | OapiSchema> = new Map()
    const czz = wiczzm.get(wu.id) ?? []
    const wczz = wiwczzm.get(wu.id) ?? []
    if (wczz.length === 0 && czz.length === 0 && wu.isMap === false) {
        if (wu.id === 1) {
            return makeSchemaObject({})
        }
        return makeReferenceEmpty()
    }

    const properties = czz.reduce(function (old, column) {
        if (includingTypeParameter(column.tf)) {
            return old
        }

        const data = makeSchemaTypeFormat(
            column.tf,
            vivm,
            wiczzm,
            wiwczzm,
            wiwm,
            wiwpzzm,
            argumentzz,
            wpiam,
        )
        if (isSchemaColumn(data)) {
            if (column.ro) {
                data.readOnly = true
            }
            if (column.wo) {
                data.writeOnly = true
            }
        }

        old[column.name] = data
        return old
    }, Object.create(null) as Record<string, OapiReference | OapiSchema>)

    const schema = makeSchemaObject({
        description: wu.description,
        properties,
    })
    if (wu.example) {
        schema.example = wu.example
    }
    if (wu.isRequest) {
        schema.required = czz.map((item) => item.name)
    }

    if (wu.isMap) {
        if (includingTypeParameter(wu.tf) === false) {
            schema.additionalProperties = makeSchemaTypeFormat(
                wu.tf,
                vivm,
                wiczzm,
                wiwczzm,
                wiwm,
                wiwpzzm,
                argumentzz,
                wpiam,
            )
        }
    }

    if (wczz.length === 0) {
        return schema
    }

    const childzz = wczz
        .filter((item) => includingTypeParameter(item.tf) === false)
        .map((item) =>
            makeSchemaTypeFormat(
                item.tf,
                vivm,
                wiczzm,
                wiwczzm,
                wiwm,
                wiwpzzm,
                argumentzz,
                wpiam,
            ),
        )
    if (czz.length || wu.isMap) {
        childzz.push(schema)
    }
    return makeSchemaComposition(childzz, wu.type as CompositionKind)
}

function includingTypeParameter(tf: LB.TypeFormat): boolean {
    if (tf.type === OapiType.TypeParameter) {
        return true
    }
    if (tf.argumentzz.find((item) => includingTypeParameter(item))) {
        return true
    }
    return false
}
