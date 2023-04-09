import { OapiType } from "@/Model/Oapi"
import makeNotFoundText from "../../Factory/makeNotFoundText"

export let errorTypeFormat = false

export function clearError() {
    errorTypeFormat = false
}

export default function makeTextTypeFormat(
    tf: LB.TypeFormat,
    sTypeFormatzzStore: LB.Finder<LB.TypeFormat>,
    sVariablezzStore: LB.Finder<LB.Variable>,
    sWuParameterzzStore: LB.Finder<LB.WuParameter>,
    sWuzzStore: LB.Finder<LB.Wu>,
): string {
    const textzz = [make()]
    if (tf.isArray) {
        textzz.push("[]")
    }
    if (tf.nullable) {
        textzz.push(" | null")
    }
    return textzz.join("")

    function make(): string {
        if (tf.type === OapiType.Enum) {
            const found = sVariablezzStore.find(tf.variableId ?? 0)
            if (found === undefined) {
                errorTypeFormat = true
                return makeNotFoundText("Enum", tf.variableId ?? "")
            }
            return `Enum ${found.name}`
        }

        if (tf.type === OapiType.WuParameter) {
            const found = sWuParameterzzStore.find(tf.wuParameterId ?? 0)
            if (found === undefined) {
                errorTypeFormat = true
                return makeNotFoundText("WuParameter", tf.wuParameterId ?? "")
            }
            return found.name
        }

        if (tf.type === OapiType.Wu) {
            return makeWuText()
        }

        return tf.type
    }

    function makeWuText(): string {
        const found = sWuzzStore.find(tf.wuId)
        if (found === undefined) {
            errorTypeFormat = true
            return makeNotFoundText("Wu", tf.wuId)
        }

        const argumentzz = sTypeFormatzzStore.itemzz.filter(
            (item) => item.ownerId === tf.id,
        )
        if (argumentzz.length === 0) {
            return found.name
        }

        const zz = argumentzz.map((item) =>
            makeTextTypeFormat(
                item,
                sTypeFormatzzStore,
                sVariablezzStore,
                sWuParameterzzStore,
                sWuzzStore,
            ),
        )
        return `${found.name}<${zz.join(", ")}>`
    }
}
