import { OapiType } from "@/Model/Oapi"
import { VariablezzStoreType } from "@/Store/useVariablezzStore"
import { WuParameterzzStoreType } from "@/Store/useWuParameterzzStore"
import { WuzzStoreType } from "@/Store/useWuzzStore"

export let errorTypeFormat = false

export function clearError() {
    errorTypeFormat = false
}

export default function makeTextTypeFormat(
    tf: LB.TypeFormat,
    sVariablezzStore: VariablezzStoreType,
    sWuParameterzzStore: WuParameterzzStoreType,
    sWuzzStore: WuzzStoreType,
): string {
    const text = make(tf, sVariablezzStore, sWuParameterzzStore, sWuzzStore)
    if (tf.isArray) {
        return text + "[]"
    }
    return text
}

export function make(
    tf: LB.TypeFormat,
    sVariablezzStore: VariablezzStoreType,
    sWuParameterzzStore: WuParameterzzStoreType,
    sWuzzStore: WuzzStoreType,
): string {
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
        return makeWuText(tf, sVariablezzStore, sWuParameterzzStore, sWuzzStore)
    }

    return tf.type
}

function makeWuText(
    tf: LB.TypeFormat,
    sVariablezzStore: VariablezzStoreType,
    sWuParameterzzStore: WuParameterzzStoreType,
    sWuzzStore: WuzzStoreType,
): string {
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
