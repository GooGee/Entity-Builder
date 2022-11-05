import { OapiReference } from "@/Model/Oapi"
import { MediaTypeObject } from "openapi3-ts"
import { ComponentKind, makeReferenceOf } from "./makeReference"
import makeSchemaTypeFormat from "./makeSchemaTypeFormat"

export default function makeMediaType(
    item: LB.Response,
    vivm: Map<number, LB.Variable>,
    riezzm: Map<string, LB.Example[]>,
    wiczzm: Map<number, LB.Column[]>,
    wiwczzm: Map<number, LB.WuChild[]>,
    wiwm: Map<number, LB.Wu>,
    wiwpzzm: Map<number, LB.WuParameter[]>,
) {
    const key = ("required" in item ? "rb" : "r") + item.id
    const data: MediaTypeObject = {
        schema: makeSchemaTypeFormat(
            item.tf,
            vivm,
            wiczzm,
            wiwczzm,
            wiwm,
            wiwpzzm,
            [],
            new Map(),
        ) as any,
    }
    if (item.example) {
        data.example = item.example
    } else {
        const examplezz = riezzm.get(key) ?? []
        if (examplezz.length) {
            data.examples = examplezz.reduce(function (old, item) {
                old[item.name] = makeReferenceOf(item.name, ComponentKind.examples)
                return old
            }, Object.create(null) as Record<string, OapiReference>)
        }
    }
    return data
}
