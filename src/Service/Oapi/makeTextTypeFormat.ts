import { OapiType } from "@/Model/Oapi"

export let errorTypeFormat = false

export function clearError() {
    errorTypeFormat = false
}

export default function makeTextTypeFormat(
    tf: LB.TypeFormat,
    sVariablezzStore: LB.Finder<LB.Variable>,
    sWuParameterzzStore: LB.Finder<LB.WuParameter>,
    sWuzzStore: LB.Finder<LB.Wu>,
): string {
    const text = make()
    if (tf.isArray) {
        return text + "[]"
    }
    return text

    function make(): string {
        if (tf.type === OapiType.Enum) {
            const found = sVariablezzStore.find(tf.targetId)
            if (found === undefined) {
                errorTypeFormat = true
                return `Enum ${tf.targetId} not found`
            }
            return `Enum ${found.name}`
        }

        if (tf.type === OapiType.TypeParameter) {
            const found = sWuParameterzzStore.find(tf.targetId)
            if (found === undefined) {
                errorTypeFormat = true
                return `TypeParameter ${tf.targetId} not found`
            }
            return found.name
        }

        if (tf.type === OapiType.Wu) {
            return makeWuText()
        }

        return tf.type
    }

    function makeWuText(): string {
        const found = sWuzzStore.find(tf.targetId)
        if (found === undefined) {
            errorTypeFormat = true
            return `Wu ${tf.targetId} not found`
        }

        if (tf.argumentzz.length === 0) {
            return found.name
        }

        const zz = tf.argumentzz.map((item) =>
            makeTextTypeFormat(item, sVariablezzStore, sWuParameterzzStore, sWuzzStore),
        )
        return `${found.name}<${zz.join(", ")}>`
    }
}
