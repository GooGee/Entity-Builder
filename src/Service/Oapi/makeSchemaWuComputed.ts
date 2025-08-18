import {
    CompositionKind,
    makeSchemaComposition,
    makeSchemaObject,
    OapiReference,
    OapiSchema,
    OapiSchemaComposition,
    OapiSchemaObject,
} from "@/Model/Oapi"
import getTypeFormatOrThrow from "../getTypeFormatOrThrow"
import { ComponentKind, makeReferenceEmpty, makeReferenceOf } from "./makeReference"
import makeSchemaTypeFormat from "./makeSchemaTypeFormat"

/**
 * only includes Wu with WuParameter
 */
export default function makeSchemaWuComputed(
    wu: LB.Wu,
    tfzz: LB.TypeFormat[],
    tfzzm: Map<number, LB.TypeFormat[]>,
    vivm: Map<number, LB.Variable>,
    wiczzm: Map<number, LB.Column[]>,
    wiwkzzm: Map<number, LB.TypeFormat[]>,
    wiwm: Map<number, LB.Wu>,
    wiwpzzm: Map<number, LB.WuParameter[]>,
    argumentzz: (OapiReference | OapiSchema)[],
): OapiReference | OapiSchemaComposition | OapiSchemaObject {
    const wpzz = wiwpzzm.get(wu.id) ?? []
    if (wpzz.length === 0) {
        return makeReferenceOf(wu.name, ComponentKind.schemas)
    }
    if (argumentzz.length < wpzz.length) {
        throw new Error(`${wu.name} require ${wpzz.length} WuParameter`)
    }
    const wpiam = new Map(wpzz.map((item, index) => [item.id, argumentzz[index]]))

    const czz = wiczzm.get(wu.id) ?? []
    const wczz = wiwkzzm.get(wu.id) ?? []
    if (wczz.length === 0 && czz.length === 0 && wu.isMap === false) {
        console.error(`makeSchemaWuComputed: Wu ${wu.name} has no columns or child TypeFormat, returning empty reference`)
        return makeReferenceEmpty()
    }

    const properties = czz.reduce(function (old, column) {
        const tf = getTypeFormatOrThrow(column.id, "ownerColumnId", tfzz)
        old[column.name] = makeSchemaTypeFormat(
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
        const tf = getTypeFormatOrThrow(wu.id, "ownerWuId", tfzz)
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

    if (wczz.length === 0) {
        return schema
    }

    const childzz = wczz.map((tf) =>
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
    if (czz.length || wu.isMap) {
        childzz.push(schema)
    }
    return makeSchemaComposition(childzz, wu.type as CompositionKind)
}
