import { makeNameItemMap } from "@/Factory/makeMap"

export const WuNamezz = ["ApiError", "ApiItem", "ApiItemzz", "ApiPage", "ApiText", "ApiValue"]
export const WuNameSet = new Set(WuNamezz)

const Name_Wu_map = new Map<string, LB.Wu>()

export default function findWrapperWu(action: string, itemzz: LB.Wu[]) {
    if (Name_Wu_map.size === 0) {
        makeNameItemMap(itemzz, Name_Wu_map)
    }

    const many = Name_Wu_map.get("ApiItemzz")
    const one = Name_Wu_map.get("ApiItem")
    const map = new Map([
        ["ReadAll", many],
        ["ReadMany", many],
        ["Current", one],
        ["One", one],
        ["ReadPage", Name_Wu_map.get("ApiPage")],
    ])
    for (const [key, value] of map) {
        if (action.includes(key)) {
            return value
        }
    }
    return Name_Wu_map.get("ApiValue")
}

export function findWrapperWuId(action: string, itemzz: LB.Wu[]) {
    return findWrapperWu(action, itemzz)?.id ?? 1
}
