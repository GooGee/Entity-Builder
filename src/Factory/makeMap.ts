export function makeIdItemMap<T extends LB.IdItem>(
    itemzz: T[],
    kv: Map<number, T> = new Map(),
) {
    itemzz.forEach((item) => kv.set(item.id, item))
    return kv
}

export function makeIdNameMap(
    itemzz: LB.IdNameItem[],
    kv: Map<string, string> = new Map(),
) {
    itemzz.forEach((item) => kv.set(item.id.toString(), item.name))
    return kv
}

interface NameType {
    name: string
}

export function makeNameItemMap<T extends NameType>(
    itemzz: T[],
    kv: Map<string, T> = new Map(),
) {
    itemzz.forEach((item) => kv.set(item.name, item))
    return kv
}

export function makeNameMap(itemzz: NameType[], kv: Map<string, string> = new Map()) {
    itemzz.forEach((item) => kv.set(item.name, item.name))
    return kv
}
