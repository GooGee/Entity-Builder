import { OapiSchemaColumn, OapiType } from "@/Model/Oapi"

const EntityTypeEnum = 'EntityTypeEnum'

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

export function fillEntityTypeEnum(Variablezz: LB.Variable[], Entityzz: LB.Entity[]) {
    const item = Variablezz.find((item) => item.name === EntityTypeEnum)
    if (item == null) {
        return
    }

    const set = new Set<string>(item.enum)
    Entityzz.filter((item) => item.isTable).forEach((item) => set.add(`App\\Models\\${item.name}`))
    item.enum = Array.from(set)
}
