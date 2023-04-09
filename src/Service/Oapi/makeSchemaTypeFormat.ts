import {
    isSchemaComposition,
    isSchemaReference,
    makeSchemaArray,
    OapiReference,
    OapiSchema,
    OapiSchemaAny,
    OapiSchemaColumn,
    OapiType,
} from "@/Model/Oapi"
import makeNotFoundText from "../../Factory/makeNotFoundText"
import makeReference, {
    ComponentKind,
    makeReferenceEmpty,
    makeReferenceOf,
} from "./makeReference"
import { makeSchemaEnumName } from "./makeSchemaEnum"
import makeSchemaWuComputed from "./makeSchemaWuComputed"

export default function makeSchemaTypeFormat(
    tf: LB.TypeFormat,
    tfzz: LB.TypeFormat[],
    tfzzm: Map<number, LB.TypeFormat[]>,
    vivm: Map<number, LB.Variable>,
    wiczzm: Map<number, LB.Column[]>,
    wiwkzzm: Map<number, LB.TypeFormat[]>,
    wiwm: Map<number, LB.Wu>,
    wiwpzzm: Map<number, LB.WuParameter[]>,
    argumentzz: (OapiReference | OapiSchema)[],
    wpiam: Map<number, OapiReference | OapiSchema>,
): OapiReference | OapiSchema {
    let schema = make()
    if (tf.isArray) {
        schema = makeSchemaArray(schema)
    }
    if (tf.nullable) {
        if (isSchemaComposition(schema)) {
            return schema
        }
        if (isSchemaReference(schema)) {
            return schema
        }
        schema.nullable = tf.nullable
    }
    return schema

    function make() {
        if (tf.type === OapiType.any) {
            return {} as OapiSchemaAny
        }

        if (tf.type === OapiType.Enum) {
            const item = vivm.get(tf.variableId ?? 0)
            if (item === undefined) {
                throw new Error(makeNotFoundText("Enum", tf.variableId ?? ""))
            }

            const name = makeSchemaEnumName(item.name)
            return makeReferenceOf(name, ComponentKind.schemas)
        }

        if (tf.type === OapiType.WuParameter) {
            const found = wpiam.get(tf.wuParameterId ?? 0)
            if (found) {
                return found
            }
            return makeReferenceEmpty()
        }

        if (tf.type === OapiType.Wu) {
            const zz = tfzzm.get(tf.id) ?? []
            if (zz.length) {
                const wu = wiwm.get(tf.wuId)
                if (wu === undefined) {
                    throw new Error(makeNotFoundText("Wu", tf.wuId))
                }

                const pzz = zz.map((item) =>
                    makeSchemaTypeFormat(
                        item,
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
                return makeSchemaWuComputed(
                    wu,
                    tfzz,
                    tfzzm,
                    vivm,
                    wiczzm,
                    wiwkzzm,
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
