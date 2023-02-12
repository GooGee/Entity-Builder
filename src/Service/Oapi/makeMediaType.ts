import { OapiReference } from "@/Model/Oapi"
import { MediaTypeObject } from "openapi3-ts"
import getTypeFormatOrThrow from "../getTypeFormatOrThrow"
import { ComponentKind, makeReferenceOf } from "./makeReference"
import makeSchemaTypeFormat from "./makeSchemaTypeFormat"

export default function makeMediaType(
    item: LB.Response,
    tfzz: LB.TypeFormat[],
    tfzzm: Map<number, LB.TypeFormat[]>,
    vivm: Map<number, LB.Variable>,
    riezzm: Map<string, LB.Example[]>,
    wiczzm: Map<number, LB.Column[]>,
    wiwkzzm: Map<number, LB.TypeFormat[]>,
    wiwm: Map<number, LB.Wu>,
    wiwpzzm: Map<number, LB.WuParameter[]>,
) {
    const tf = getTypeFormatOrThrow(
        item.id,
        "required" in item ? "ownerRequestId" : "ownerResponseId",
        tfzz,
    )
    const data: MediaTypeObject = {
        schema: makeSchemaTypeFormat(
            tf,
            tfzz,
            tfzzm,
            vivm,
            wiczzm,
            wiwkzzm,
            wiwm,
            wiwpzzm,
            [],
            new Map(),
        ) as any,
    }
    if (item.example) {
        data.example = item.example
    } else {
        const key = ("required" in item ? "rb" : "r") + item.id
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
