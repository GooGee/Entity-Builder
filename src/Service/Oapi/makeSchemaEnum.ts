import { OapiSchemaColumn, OapiType } from "@/Model/Oapi"

export default function makeSchemaEnum(item: LB.Variable): OapiSchemaColumn {
    return {
        description: item.description,
        enum: item.enum,
        type: item.type as OapiType.string,
    }
}

export function makeSchemaEnumName(name: string) {
    return "__Enum__" + name
}
