import { GetState } from "zustand"
import makeItemzzStoreData, {
    CRUD,
    ItemzzStoreDataType,
} from "./makeItemzzStoreData"

interface Item {
    id: number
    name: string
}

export interface NamedItemzzStoreDataType<K> extends ItemzzStoreDataType<K> {
    findByName(name: string): K | undefined
}

export default function makeNamedItemzzStoreData<
    T extends NamedItemzzStoreDataType<K>,
    K extends Item
>(
    set: (state: T | ((state: T) => T)) => void,
    get: GetState<T>,
    crud: CRUD<K>
) {
    const data = makeItemzzStoreData<T, K>(set, get, crud)
    return {
        ...data,
        findByName(name: string) {
            return get().itemzz.find((item) => item.name === name)
        },
    }
}
