import {
    OapiReference,
    OapiSchema,
    OapiSchemaComposition,
    OapiSchemaObject,
    makeSchemaObject,
    makeSchemaComposition,
    CompositionKind,
    isSchemaColumn,
    OapiSchemaAny,
} from "@/Model/Oapi"
import { makeReferenceEmpty } from "./makeReference"
import makeSchemaTypeFormat from "./makeSchemaTypeFormat"
import { includingTypeParameter } from "./makeSchemaWuReference"

/**
 * includes all columns
 */
export default function makeSchemaWu(
    wu: LB.Wu,
    vivm: Map<number, LB.Variable>,
    wiczzm: Map<number, LB.Column[]>,
    wiwczzm: Map<number, LB.WuChild[]>,
    wiwm: Map<number, LB.Wu>,
    wiwpzzm: Map<number, LB.WuParameter[]>,
    parameterzz: (OapiSchemaAny | OapiReference | OapiSchema)[],
): OapiReference | OapiSchemaComposition | OapiSchemaObject {
    const wpzz = wiwpzzm.get(wu.id) ?? []
    if (parameterzz.length < wpzz.length) {
        throw new Error(`${wu.name} require ${wpzz.length} TypeParameter`)
    }
    const wpism = new Map(wpzz.map((item, index) => [item.id, parameterzz[index]]))

    const czz = wiczzm.get(wu.id) ?? []
    const properties = czz.reduce(function (old, column) {
        const data = makeSchemaTypeFormat(
            column.tf,
            vivm,
            wiczzm,
            wiwczzm,
            wiwm,
            wiwpzzm,
            parameterzz,
            wpism,
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
    }, Object.create(
        null,
    ) as Record<string, OapiSchemaAny | OapiReference | OapiSchema>)

    const wczz = wiwczzm.get(wu.id) ?? []
    if (wczz.length === 0 && czz.length === 0 && wu.isMap === false) {
        if (wu.id === 1) {
            return makeSchemaObject({})
        }
        return makeReferenceEmpty()
    }

    const schema = makeSchemaObject({
        description: wu.description,
        properties,
    })
    if (wu.example) {
        schema.example = wu.example
    }

    if (wu.isMap) {
        if (includingTypeParameter(wu.tf)) {
            // skip
        } else {
            schema.additionalProperties = makeSchemaTypeFormat(
                wu.tf,
                vivm,
                wiczzm,
                wiwczzm,
                wiwm,
                wiwpzzm,
                parameterzz,
                wpism,
            )
        }
    }

    if (wu.isRequest) {
        schema.required = czz.map((item) => item.name)
    }

    if (wczz.length === 0) {
        return schema
    }

    const childzz = wczz.map((item) =>
        makeSchemaTypeFormat(
            item.tf,
            vivm,
            wiczzm,
            wiwczzm,
            wiwm,
            wiwpzzm,
            parameterzz,
            wpism,
        ),
    )
    if (czz.length) {
        childzz.push(schema)
    }
    return makeSchemaComposition(childzz, wu.type as CompositionKind)
}
