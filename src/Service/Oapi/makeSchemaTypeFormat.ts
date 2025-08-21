import {
    CompositionKind,
    isSchemaReference,
    makeSchemaArray,
    makeSchemaComposition,
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
import { OapiDto } from "./prepareOapiDto"

export default function makeSchemaTypeFormat(
    tf: LB.TypeFormat,
    od: OapiDto,
    argumentzz: (OapiReference | OapiSchema)[],
    wpiam: Map<number, OapiReference | OapiSchema>,
): OapiReference | OapiSchema {
    let schema = make()
    if (tf.isArray) {
        schema = makeSchemaArray(schema)
    }
    if (tf.nullable) {
        if (isSchemaReference(schema)) {
            schema = makeSchemaComposition([schema], CompositionKind.allOf)
        }
        schema.nullable = tf.nullable
    }
    return schema

    function make() {
        if (tf.type === OapiType.any) {
            return {} as OapiSchemaAny
        }

        if (tf.type === OapiType.Enum) {
            const item = od.Variable_map.get(tf.variableId ?? 0)
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
            const zz = od.OwnerId_TypeFormatzz_map.get(tf.id) ?? []
            if (zz.length) {
                const wu = od.Wu_map.get(tf.wuId)
                if (wu === undefined) {
                    throw new Error(makeNotFoundText("Wu", tf.wuId))
                }

                const pzz = zz.map((item) =>
                    makeSchemaTypeFormat(
                        item,
                        od,
                        argumentzz,
                        wpiam,
                    ),
                )
                return makeSchemaWuComputed(
                    wu,
                    od,
                    pzz,
                )
            }

            return makeReference(tf, od.Wu_map)
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
