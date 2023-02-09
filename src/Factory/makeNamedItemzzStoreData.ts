import { GetState } from "zustand"
import makeItemzzStoreData, { CRUD, ItemzzStoreDataType } from "./makeItemzzStoreData"

interface Item {
    id: number
    name: string
}

export interface NamedItemzzStoreDataType<K> extends ItemzzStoreDataType<K> {
    sorting: boolean
    findByName(name: string): K | undefined
}

export default function makeNamedItemzzStoreData<
    T extends NamedItemzzStoreDataType<K>,
    K extends Item,
>(
    set: (state: T | ((state: T) => T)) => void,
    get: GetState<T>,
    crud: CRUD<K>,
    callback?: (itemzz: K[]) => void,
) {
    const data = makeItemzzStoreData<T, K>(set, get, crud)
    function watch(itemzz: K[]) {
        if (get().sorting) {
            itemzz.sort((aa, bb) => aa.name.localeCompare(bb.name))
        }
        set({ itemzz } as T)
        if (callback) {
            callback(itemzz)
        }
    }
    return {
        ...data,
        sorting: false,
        findByName(name: string) {
            return get().itemzz.find((item) => item.name === name)
        },
        observe() {
            if (get().observed) {
                return
            }
            set({ observed: true } as T)
            crud.observeAll(watch)
            crud.findAll().then(watch)
        },
    }
}
