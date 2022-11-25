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

/**
 * only includes Wu with WuParameter
 */
export default function makeSchemaWuComputed(
    wu: LB.Wu,
    vivm: Map<number, LB.Variable>,
    wiczzm: Map<number, LB.Column[]>,
    wiwczzm: Map<number, LB.WuChild[]>,
    wiwm: Map<number, LB.Wu>,
    wiwpzzm: Map<number, LB.WuParameter[]>,
    argumentzz: (OapiReference | OapiSchema)[],
): OapiReference | OapiSchemaComposition | OapiSchemaObject {
    const wpzz = wiwpzzm.get(wu.id) ?? []
    if (wpzz.length === 0) {
        return makeReferenceOf(wu.name, ComponentKind.schemas)
    }
    if (argumentzz.length < wpzz.length) {
        throw new Error(`${wu.name} require ${wpzz.length} TypeParameter`)
    }
    const wpiam = new Map(wpzz.map((item, index) => [item.id, argumentzz[index]]))

    const czz = wiczzm.get(wu.id) ?? []
    const wczz = wiwczzm.get(wu.id) ?? []
    if (wczz.length === 0 && czz.length === 0 && wu.isMap === false) {
        return makeReferenceEmpty()
    }

    const properties = czz.reduce(function (old, column) {
        old[column.name] = makeSchemaTypeFormat(
            column.tf,
            vivm,
            wiczzm,
            wiwczzm,
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
            argumentzz,
            wpiam,
        ),
    )
    if (czz.length || wu.isMap) {
        childzz.push(schema)
    }
    return makeSchemaComposition(childzz, wu.type as CompositionKind)
}
