import {
    makeSchemaArray,
    OapiReference,
    OapiSchema,
    OapiSchemaAny,
    OapiSchemaColumn,
    OapiType,
} from "@/Model/Oapi"
import makeReference, {
    ComponentKind,
    makeReferenceEmpty,
    makeReferenceOf,
} from "./makeReference"
import { makeSchemaEnumName } from "./makeSchemaEnum"
import makeSchemaWuComputed from "./makeSchemaWuComputed"

export default function makeSchemaTypeFormat(
    tf: LB.TypeFormat,
    vivm: Map<number, LB.Variable>,
    wiczzm: Map<number, LB.Column[]>,
    wiwczzm: Map<number, LB.WuChild[]>,
    wiwm: Map<number, LB.Wu>,
    wiwpzzm: Map<number, LB.WuParameter[]>,
    argumentzz: (OapiReference | OapiSchema)[],
    wpiam: Map<number, OapiReference | OapiSchema>,
): OapiReference | OapiSchema {
    const schema = make()
    if (tf.isArray) {
        return makeSchemaArray(schema)
    }
    return schema

    function make() {
        if (tf.type === OapiType.any) {
            return {} as OapiSchemaAny
        }

        if (tf.type === OapiType.Enum) {
            const item = vivm.get(tf.targetId)
            if (item === undefined) {
                throw new Error(`Enum ${tf.targetId} not found`)
            }

            const name = makeSchemaEnumName(item.name)
            return makeReferenceOf(name, ComponentKind.schemas)
        }

        if (tf.type === OapiType.TypeParameter) {
            const found = wpiam.get(tf.targetId)
            if (found) {
                return found
            }
            return makeReferenceEmpty()
        }

        if (tf.type === OapiType.Wu) {
            if (tf.argumentzz.length) {
                const wu = wiwm.get(tf.targetId)
                if (wu === undefined) {
                    throw new Error(`Wu ${tf.targetId} not found`)
                }

                const pzz = tf.argumentzz.map((item) =>
                    makeSchemaTypeFormat(
                        item,
                        vivm,
                        wiczzm,
                        wiwczzm,
                        wiwm,
                        wiwpzzm,
                        argumentzz,
                        wpiam,
                    ),
                )
                return makeSchemaWuComputed(
                    wu,
                    vivm,
                    wiczzm,
                    wiwczzm,
                    wiwm,
                    wiwpzzm,
                    pzz,
                )
            }

            return makeReference(tf, wiwm)
        }

        const data = {
            format: tf.format,
            type: tf.type,
        } as OapiSchemaColumn
        if (tf.nullable) {
            data.nullable = true
        }
        return data
    }
}
