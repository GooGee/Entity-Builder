import { OapiType } from "@/Model/Oapi"
import makeNotFoundText from "../../Factory/makeNotFoundText"

export let errorTypeFormat = false

export function clearError() {
    errorTypeFormat = false
}

export default function makeTextTypeFormat(
    tf: LB.TypeFormat,
    tfzz: LB.TypeFormat[],
    variablezz: LB.Variable[],
    wpzz: LB.WuParameter[],
    wuzz: LB.Wu[],
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
            const found = variablezz.find((item) => (tf.variableId ?? 0) === item.id)
            if (found === undefined) {
                errorTypeFormat = true
                return makeNotFoundText("Enum", tf.variableId ?? "")
            }
            return `Enum ${found.name}`
        }

        if (tf.type === OapiType.WuParameter) {
            const found = wpzz.find((item) => (tf.wuParameterId ?? 0) === item.id)
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
        const found = wuzz.find((item) => tf.wuId === item.id)
        if (found === undefined) {
            errorTypeFormat = true
            return makeNotFoundText("Wu", tf.wuId)
        }

        const argumentzz = tfzz.filter((item) => item.ownerId === tf.id)
        if (argumentzz.length === 0) {
            return found.name
        }

        const zz = argumentzz.map((item) =>
            makeTextTypeFormat(item, tfzz, variablezz, wpzz, wuzz),
        )
        return `${found.name}<${zz.join(", ")}>`
    }
}
