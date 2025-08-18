import { OapiReference, OapiType } from "@/Model/Oapi"

export default function makeReference(tf: LB.TypeFormat, wiwm: Map<number, LB.Wu>) {
    if (tf.type === OapiType.WuParameter) {
        return makeReferenceEmpty()
    }

    const wu = wiwm.get(tf.wuId)
    if (wu === undefined) {
        console.log(`Wu not found for TypeFormat: ${tf.id}, wuId: ${tf.wuId}`)
        return makeReferenceEmpty()
    }

    return makeReferenceOf(wu.name, ComponentKind.schemas)
}

export function makeReferenceEmpty() {
    return makeReferenceOf("Empty", ComponentKind.schemas)
}

export function makeReferenceOf(name: string, kind: ComponentKind): OapiReference {
    return {
        $ref: `#/components/${kind}/${name}`,
    }
}

export enum ComponentKind {
    callbacks = "callbacks",
    examples = "examples",
    headers = "headers",
    links = "links",
    parameters = "parameters",
    requestBodies = "requestBodies",
    responses = "responses",
    schemas = "schemas",
    securitySchemes = "securitySchemes",
}
