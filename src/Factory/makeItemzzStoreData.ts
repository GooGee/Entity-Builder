import { GetState } from "zustand"

export interface CRUD<K> {
    findAll(): Promise<K[]>
    observeAll(handler: (itemzz: K[]) => void): Promise<void>
}

interface Item {
    id: number
}

export interface ItemzzStoreDataType<K> {
    itemzz: K[]
    observed: boolean
    find(id: number): K | undefined
    observe(): void
    setItem(item: K): void
}

export default function makeItemzzStoreData<
    T extends ItemzzStoreDataType<K>,
    K extends Item,
>(
    set: (state: T | ((state: T) => T)) => void,
    get: GetState<T>,
    crud: CRUD<K>,
    callback?: (itemzz: K[]) => void,
) {
    function watch(itemzz: K[]) {
        set({ itemzz } as T)
        if (callback) {
            callback(itemzz)
        }
    }
    return {
        itemzz: [] as K[],
        observed: false,
        find(id: number) {
            return get().itemzz.find((item) => item.id === id)
        },
        observe() {
            if (get().observed) {
                return
            }
            set({ observed: true } as T)
            crud.observeAll(watch)
            crud.findAll().then(watch)
        },
        setItem(item: K) {
            set((state) => {
                const itemzz = state.itemzz
                    .filter((one) => one.id !== item.id)
                    .concat(item)
                return { itemzz } as T
            })
        },
    }
}
