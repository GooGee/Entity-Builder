export function makeIdItemMap<T extends LB.IdItem>(
    itemzz: T[],
    kv: Map<number, T> = new Map(),
) {
    itemzz.forEach((item) => kv.set(item.id, item))
    return kv
}

function makeIdNameMap(itemzz: LB.IdNameItem[], kv: Map<string, string> = new Map()) {
    itemzz.forEach((item) => kv.set(item.id.toString(), item.name))
    return kv
}

interface NameType {
    name: string
}

function makeNameItemMap<T extends NameType>(
    itemzz: T[],
    kv: Map<string, T> = new Map(),
) {
    itemzz.forEach((item) => kv.set(item.name, item))
    return kv
}

function makeNameMap(itemzz: NameType[], kv: Map<string, string> = new Map()) {
    itemzz.forEach((item) => kv.set(item.name, item.name))
    return kv
}
