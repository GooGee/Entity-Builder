import { OapiReference } from "@/Model/Oapi"
import { MediaTypeObject } from "openapi3-ts"
import { ComponentKind, makeReferenceOf } from "./makeReference"
import makeSchemaTypeFormat from "./makeSchemaTypeFormat"
import { getTypeFormatOrThrow, OapiDto } from "./prepareOapiDto"

export default function makeMediaType(
    item: LB.Response,
    od: OapiDto,
    riezzm: Map<string, LB.Example[]>,
) {
    const map = "required" in item ? od.OwnerRequestId_TypeFormatzz_map : od.OwnerResponseId_TypeFormatzz_map
    const tf = getTypeFormatOrThrow(item.id, map,)
    const data: MediaTypeObject = {
        schema: makeSchemaTypeFormat(
            tf,
            od,
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
