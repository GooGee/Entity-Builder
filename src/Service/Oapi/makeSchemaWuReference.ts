import {
    CompositionKind,
    makeSchemaComposition,
    makeSchemaObject,
    OapiReference,
    OapiSchema,
    OapiSchemaComposition,
    OapiType,
} from "@/Model/Oapi"
import { ComponentKind, makeReferenceOf } from "./makeReference"
import makeSchemaTypeFormat from "./makeSchemaTypeFormat"

/**
 * only includes a OapiReference and resolved columns
 */
export default function makeSchemaWuReference(
    wu: LB.Wu,
    vivm: Map<number, LB.Variable>,
    wiczzm: Map<number, LB.Column[]>,
    wiwczzm: Map<number, LB.WuChild[]>,
    wiwm: Map<number, LB.Wu>,
    wiwpzzm: Map<number, LB.WuParameter[]>,
    parameterzz: (object | OapiReference | OapiSchema)[],
): OapiReference | OapiSchemaComposition {
    const wpzz = wiwpzzm.get(wu.id) ?? []
    if (parameterzz.length < wpzz.length) {
        throw new Error(`${wu.name} require ${wpzz.length} TypeParameter`)
    }
    const wpism = new Map(wpzz.map((item, index) => [item.id, parameterzz[index]]))

    const czz = (wiczzm.get(wu.id) ?? []).filter((item) =>
        includingTypeParameter(item.tf),
    )
    const properties = czz.reduce(function (old, column) {
        old[column.name] = makeSchemaTypeFormat(
            column.tf,
            vivm,
            wiczzm,
            wiwczzm,
            wiwm,
            wiwpzzm,
            parameterzz,
            wpism,
        )
        return old
    }, Object.create(null) as Record<string, object | OapiReference | OapiSchema>)

    const reference = makeReferenceOf(wu.name, ComponentKind.schemas)
    const wczz = (wiwczzm.get(wu.id) ?? []).filter((item) =>
        includingTypeParameter(item.tf),
    )
    if (wczz.length === 0 && czz.length === 0 && wu.isMap === false) {
        return reference
    }

    const schema = makeSchemaObject({
        properties,
    })

    if (wu.isMap) {
        if (includingTypeParameter(wu.tf)) {
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

    if (wczz.length === 0) {
        return makeSchemaComposition([reference, schema], CompositionKind.allOf)
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
    childzz.push(reference)
    if (czz.length) {
        childzz.push(schema)
    }
    return makeSchemaComposition(childzz, wu.type as CompositionKind)
}

export function includingTypeParameter(tf: LB.TypeFormat): boolean {
    if (tf.type === OapiType.TypeParameter) {
        return true
    }
    if (tf.argumentzz.find((item) => includingTypeParameter(item))) {
        return true
    }
    return false
}
