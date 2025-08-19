import {
    CompositionKind,
    makeSchemaComposition,
    makeSchemaObject,
    OapiReference,
    OapiSchema,
    OapiSchemaComposition,
    OapiSchemaObject,
} from "@/Model/Oapi"
import { ComponentKind, makeReferenceEmpty, makeReferenceOf } from "./makeReference"
import makeSchemaTypeFormat from "./makeSchemaTypeFormat"
import { getTypeFormatOrThrow, OapiDto } from "./prepareOapiDto"

/**
 * only includes Wu with WuParameter
 */
export default function makeSchemaWuComputed(
    wu: LB.Wu,
    od: OapiDto,
    argumentzz: (OapiReference | OapiSchema)[],
): OapiReference | OapiSchemaComposition | OapiSchemaObject {
    const wpzz = od.WuId_WuParameterzz_map.get(wu.id) ?? []
    if (wpzz.length === 0) {
        return makeReferenceOf(wu.name, ComponentKind.schemas)
    }
    if (argumentzz.length < wpzz.length) {
        throw new Error(`${wu.name} require ${wpzz.length} WuParameter`)
    }
    const wpiam = new Map(wpzz.map((item, index) => [item.id, argumentzz[index]]))

    const czz = od.WuId_Columnzz_map.get(wu.id) ?? []
    const wczz = od.OwnerWuChildId_TypeFormatzz_map.get(wu.id) ?? []
    if (wczz.length === 0 && czz.length === 0 && wu.isMap === false) {
        console.error(`makeSchemaWuComputed: Wu ${wu.name} has no columns or child TypeFormat, returning empty reference`)
        return makeReferenceEmpty()
    }

    const properties = czz.reduce(function (old, column) {
        const tf = getTypeFormatOrThrow(column.id, od.OwnerColumnId_TypeFormatzz_map)
        old[column.name] = makeSchemaTypeFormat(
            tf,
            od,
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
        const tf = getTypeFormatOrThrow(wu.id, od.OwnerWuId_TypeFormatzz_map)
        schema.additionalProperties = makeSchemaTypeFormat(
            tf,
            od,
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
            od,
            argumentzz,
            wpiam,
        ),
    )
    if (czz.length || wu.isMap) {
        childzz.push(schema)
    }
    return makeSchemaComposition(childzz, wu.type as CompositionKind)
}
