import { PageEnum } from "@/menuzz"
import {
    OpenApiBuilder,
    SchemaObject,
    ReferenceObject,
    HeaderObject,
    ParameterStyle,
    ParameterLocation,
} from "openapi3-ts"
import { getLocation } from "../getParameter"
import { makeReferenceOf, ComponentKind } from "./makeReference"

export default function makeParameter(
    item: LB.ParameterMap,
    column: LB.Column,
    eiem: Map<number, LB.Entity>,
    builder: OpenApiBuilder,
    schema?: SchemaObject | ReferenceObject,
) {
    const data: HeaderObject = {
        allowReserved: column.allowReserved,
        deprecated: column.deprecated,
        description: column.description,
        example: column.example,
        explode: column.explode,
        required: column.required,
        schema,
        style: column.style as ParameterStyle,
    }

    const entity = eiem.get(column.entityId)
    if (entity === undefined) {
        return
    }

    if (entity.name === PageEnum.ParameterInHeader) {
        builder.addHeader(column.name, data)
        return
    }

    const location = getLocation(entity.name)
    builder.addParameter(makeParameterName(location, column), {
        ...data,
        name: item.alias ? item.alias : column.name,
        in: location as ParameterLocation,
    })
}

export function makeParameterName(location: string, column: LB.Column) {
    return location + "-" + column.name
}

export function makeParameterReference(
    column: LB.Column,
    eiem: Map<number, LB.Entity>,
) {
    const entity = eiem.get(column.entityId)
    if (entity === undefined) {
        return makeReferenceOf(column.name, ComponentKind.parameters)
    }

    if (entity.name === PageEnum.ParameterInHeader) {
        return makeReferenceOf(column.name, ComponentKind.headers)
    }

    const location = getLocation(entity.name)
    return makeReferenceOf(
        makeParameterName(location, column),
        ComponentKind.parameters,
    )
}
