export enum OapiType {
    any = "any",
    boolean = "boolean",
    integer = "integer",
    number = "number",
    string = "string",
    Enum = "Enum",
    TypeParameter = "TypeParameter",
    Wu = "Wu",
}

export const OapiTypezz = Object.keys(OapiType) as Array<keyof typeof OapiType>

export type SchemaColumnType = Exclude<
    OapiType,
    OapiType.Enum | OapiType.TypeParameter | OapiType.Wu
>

export enum CompositionKind {
    allOf = "allOf",
    anyOf = "anyOf",
    oneOf = "oneOf",
}

export const CompositionKindzz = Object.keys(CompositionKind) as Array<
    keyof typeof CompositionKind
>

export enum EnumType {
    integer = "integer",
    number = "number",
    string = "string",
}

export const EnumTypezz = Object.keys(EnumType) as Array<keyof typeof EnumType>

export enum Format {
    byte = "byte",
    binary = "binary",

    double = "double",
    float = "float",
    int32 = "int32",
    int64 = "int64",

    email = "email",
    date = "date",
    "date-time" = "date-time",
    time = "time",
}

export const Formatzz = Object.keys(Format) as Array<keyof typeof Format>

export enum HttpMethod {
    delete = "delete",
    get = "get",
    head = "head",
    options = "options",
    patch = "patch",
    post = "post",
    put = "put",
    trace = "trace",
}

export const HttpMethodzz = Object.keys(HttpMethod) as Array<keyof typeof HttpMethod>

export enum ParameterLocation {
    cookie = "cookie",
    header = "header",
    path = "path",
    query = "query",
}

export const ParameterLocationzz = [
    ParameterLocation.cookie,
    ParameterLocation.path,
    ParameterLocation.query,
]

export interface OapiReference {
    $ref: string
}

export type OapiSchema =
    | OapiSchemaArray
    | OapiSchemaColumn
    | OapiSchemaComposition
    | OapiSchemaObject

export interface OapiSchemaAny {}

export interface OapiSchemaArray {
    items: OapiSchemaAny | OapiReference | OapiSchema
    type: "array"
}

export interface OapiSchemaColumn {
    description?: string
    enum?: string[]
    format?: string
    nullable?: boolean
    readOnly?: boolean
    type: SchemaColumnType
    writeOnly?: boolean
}

export type OapiSchemaComposition =
    | OapiSchemaCompositionAllOf
    | OapiSchemaCompositionAnyOf
    | OapiSchemaCompositionOneOf

interface OapiSchemaCompositionAllOf {
    [CompositionKind.allOf]: (OapiReference | OapiSchema)[]
}

interface OapiSchemaCompositionAnyOf {
    [CompositionKind.anyOf]: (OapiReference | OapiSchema)[]
}

interface OapiSchemaCompositionOneOf {
    [CompositionKind.oneOf]: (OapiReference | OapiSchema)[]
}

export interface OapiSchemaObject {
    additionalProperties?: OapiSchemaAny | OapiReference | OapiSchema
    description?: string
    example?: string
    properties?: Record<string, OapiSchemaAny | OapiReference | OapiSchema>
    required?: string[]
    type: "object"
}

export function isPrimary(type: OapiType) {
    return isReference(type) === false
}

export function isReference(type: OapiType) {
    return [OapiType.Enum, OapiType.TypeParameter, OapiType.Wu].includes(type)
}

export function isSchema(
    item: OapiSchemaAny | OapiReference | OapiSchema,
): item is OapiSchema {
    return isSchemaArray(item) || isSchemaColumn(item) || isSchemaComposition(item)
}

export function isSchemaArray(
    item: OapiSchemaAny | OapiReference | OapiSchema,
): item is OapiSchemaArray {
    return "items" in item
}

export function isSchemaColumn(
    item: OapiSchemaAny | OapiReference | OapiSchema,
): item is OapiSchemaColumn {
    return "type" in item
}

function isSchemaComposition(
    item: OapiSchemaAny | OapiReference | OapiSchema,
): item is OapiSchemaComposition {
    if (CompositionKindzz.find((key) => key in item)) {
        return true
    }
    return false
}

export function isSchemaReference(
    item: OapiSchemaAny | OapiReference | OapiSchema,
): item is OapiReference {
    return "$ref" in item
}

export function makeSchemaArray(
    items: OapiSchemaAny | OapiReference | OapiSchema,
): OapiSchemaArray {
    return {
        type: "array",
        items,
    }
}

export function makeSchemaComposition(
    itemzz: (OapiSchemaAny | OapiReference | OapiSchema)[] = [],
    kind: CompositionKind,
): OapiSchemaComposition {
    const zz: (OapiReference | OapiSchema)[] = []
    itemzz.forEach((item) => {
        if (isSchemaReference(item) || isSchema(item)) {
            mergeComposition(item, zz, kind)
        }
    })
    return {
        [kind]: zz,
    } as any
}

export function makeSchemaObject(data: Partial<OapiSchemaObject>): OapiSchemaObject {
    return {
        ...data,
        type: "object",
    }
}

function mergeComposition(
    item: OapiReference | OapiSchema,
    itemzz: (OapiReference | OapiSchema)[],
    kind: CompositionKind,
) {
    if (isSchemaComposition(item)) {
        if (kind in item) {
            const oo = item as any
            const zz = oo[kind] as (OapiReference | OapiSchema)[]
            zz.forEach((item) => mergeComposition(item, itemzz, kind))
            return
        }
    }

    itemzz.push(item)
}
