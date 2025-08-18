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
import getTypeFormatOrThrow from "../getTypeFormatOrThrow"
import { makeReferenceEmpty } from "./makeReference"
import makeSchemaTypeFormat from "./makeSchemaTypeFormat"

/**
 * only includes Wu that has no WuParameter
 */
export default function makeSchemaWu(
    wu: LB.Wu,
    tfzz: LB.TypeFormat[],
    tfzzm: Map<number, LB.TypeFormat[]>,
    vivm: Map<number, LB.Variable>,
    wiczzm: Map<number, LB.Column[]>,
    wiwkzzm: Map<number, LB.TypeFormat[]>,
    wiwm: Map<number, LB.Wu>,
): OapiReference | OapiSchemaComposition | OapiSchemaObject {
    const wiwpzzm: Map<number, LB.WuParameter[]> = new Map()
    const argumentzz: (OapiReference | OapiSchema)[] = []
    const wpiam: Map<number, OapiReference | OapiSchema> = new Map()
    const czz = wiczzm.get(wu.id) ?? []
    const wczz = wiwkzzm.get(wu.id) ?? []
    if (wczz.length === 0 && czz.length === 0 && wu.isMap === false) {
        if (wu.id === 1) {
            return makeSchemaObject({})
        }
        console.error(`makeSchemaWu: Wu ${wu.name} has no columns or child TypeFormat, returning empty reference`)
        return makeReferenceEmpty()
    }

    const properties = czz.reduce(function (old, column) {
        const tf = getTypeFormatOrThrow(column.id, "ownerColumnId", tfzz)
        if (includingWuParameter(tf, tfzzm)) {
            return old
        }

        const data = makeSchemaTypeFormat(
            tf,
            tfzz,
            tfzzm,
            vivm,
            wiczzm,
            wiwkzzm,
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
        // todo
        // schema.required = czz.map((item) => item.name)
    }

    if (wu.isMap) {
        const tf = getTypeFormatOrThrow(wu.id, "ownerWuId", tfzz)
        if (includingWuParameter(tf, tfzzm) === false) {
            schema.additionalProperties = makeSchemaTypeFormat(
                tf,
                tfzz,
                tfzzm,
                vivm,
                wiczzm,
                wiwkzzm,
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

    const childzz = []
    wczz.forEach((tf) => {
        childzz.push(
            makeSchemaTypeFormat(
                tf,
                tfzz,
                tfzzm,
                vivm,
                wiczzm,
                wiwkzzm,
                wiwm,
                wiwpzzm,
                argumentzz,
                wpiam,
            ),
        )
    })
    if (czz.length || wu.isMap) {
        childzz.push(schema)
    }
    return makeSchemaComposition(childzz, wu.type as CompositionKind)
}

function includingWuParameter(
    tf: LB.TypeFormat,
    tfzzm: Map<number, LB.TypeFormat[]>,
): boolean {
    if (tf.type === OapiType.WuParameter) {
        return true
    }

    const argumentzz = tfzzm.get(tf.id) ?? []
    if (argumentzz.find((item) => includingWuParameter(item, tfzzm))) {
        return true
    }
    return false
}
