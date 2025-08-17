export function makeChildzzMap<T extends LB.IdItem>(
    itemzz: T[],
    column: keyof T,
    map: Map<number, T[]> = new Map(),
) {
    itemzz.forEach(function (item) {
        const key = item[column] as unknown as number
        let found = map.get(key)
        if (found === undefined) {
            found = []
            map.set(key, found)
        }
        found.push(item)
    })
    return map
}

export function makeIdItemMap<T extends LB.IdItem>(
    itemzz: T[],
    map: Map<number, T> = new Map(),
) {
    itemzz.forEach((item) => map.set(item.id, item))
    return map
}

export function makeIdNameMap(
    itemzz: LB.IdNameItem[],
    map: Map<number, string> = new Map(),
) {
    itemzz.forEach((item) => map.set(item.id, item.name))
    return map
}

interface NameType {
    name: string
}

export function makeNameItemMap<T extends NameType>(
    itemzz: T[],
    map: Map<string, T> = new Map(),
) {
    itemzz.forEach((item) => map.set(item.name, item))
    return map
}
