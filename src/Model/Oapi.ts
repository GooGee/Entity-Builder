export enum OapiType {
    any = "any",
    boolean = "boolean",
    integer = "integer",
    number = "number",
    string = "string",

    Enum = "Enum",
    WuParameter = "WuParameter",
    Wu = "Wu",
}

export const OapiTypezz = Object.keys(OapiType) as Array<keyof typeof OapiType>

export enum OapiSchemaType {
    array = "array",
    object = "object",
}

export type SchemaColumnType = Exclude<
    OapiType,
    OapiType.Enum | OapiType.WuParameter | OapiType.Wu
>

export enum CompositionKind {
    allOf = "allOf",
    anyOf = "anyOf",
    oneOf = "oneOf",
}

export const CompositionKindzz = Object.keys(CompositionKind) as Array<
    keyof typeof CompositionKind
>

export const EnumTypezz = [OapiType.integer, OapiType.number, OapiType.string]

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

export const ActionMethodMap = new Map([
    ["Create", HttpMethod.post],
    ["Delete", HttpMethod.delete],
    ["Update", HttpMethod.put],
])

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

export enum ParameterStyle {
    deepObject = "deepObject",
    form = "form",
    label = "label",
    matrix = "matrix",
    pipeDelimited = "pipeDelimited",
    simple = "simple",
    spaceDelimited = "spaceDelimited",
}

export const ParameterStylezz = Object.keys(ParameterStyle) as ParameterStyle[]

export interface OapiReference {
    $ref: string
}

export type OapiSchema =
    | OapiSchemaAny
    | OapiSchemaArray
    | OapiSchemaColumn
    | OapiSchemaComposition
    | OapiSchemaObject

export interface OapiSchemaAny {
    description?: string
    nullable?: boolean
}

export interface OapiSchemaArray extends OapiSchemaAny {
    items: OapiReference | OapiSchema
    type: OapiSchemaType.array
}

export interface OapiSchemaColumn extends OapiSchemaAny {
    enum?: string[]
    format?: string
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

export interface OapiSchemaObject extends OapiSchemaAny {
    additionalProperties?: OapiReference | OapiSchema
    example?: string
    properties?: Record<string, OapiReference | OapiSchema>
    required?: string[]
    type: OapiSchemaType.object
}

export function isPrimary(type: OapiType) {
    return isReference(type) === false
}

export function isReference(type: OapiType) {
    return [OapiType.Enum, OapiType.WuParameter, OapiType.Wu].includes(type)
}

export function isSchema(item: OapiReference | OapiSchema): item is OapiSchema {
    return (
        isOapiSchemaAny(item) ||
        isSchemaArray(item) ||
        isSchemaColumn(item) ||
        isSchemaComposition(item)
    )
}

export function isOapiSchemaAny(
    item: OapiReference | OapiSchema,
): item is OapiSchemaAny {
    const keyzz = Object.keys(item)
    if (keyzz.length > 2) {
        return false
    }

    const keySet = new Set(["description", "nullable"])
    return keyzz.every((item) => keySet.has(item))
}

export function isSchemaArray(
    item: OapiReference | OapiSchema,
): item is OapiSchemaArray {
    return "items" in item
}

export function isSchemaColumn(
    item: OapiReference | OapiSchema,
): item is OapiSchemaColumn {
    return "type" in item
}

export function isSchemaComposition(
    item: OapiReference | OapiSchema,
): item is OapiSchemaComposition {
    if (CompositionKindzz.find((key) => key in item)) {
        return true
    }
    return false
}

export function isSchemaReference(
    item: OapiReference | OapiSchema,
): item is OapiReference {
    return "$ref" in item
}

export function makeSchemaArray(items: OapiReference | OapiSchema): OapiSchemaArray {
    return {
        type: OapiSchemaType.array,
        items,
    }
}

export function makeSchemaComposition(
    itemzz: (OapiReference | OapiSchema)[] = [],
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
        type: OapiSchemaType.object,
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
