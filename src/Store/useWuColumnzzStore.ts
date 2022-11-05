import { makeWuColumnCRUD } from "@/Database/makeCRUD"
import makeItemzzStoreData, { ItemzzStoreDataType } from "@/Factory/makeItemzzStoreData"
import create from "zustand"

type T = LB.WuColumn

type WuColumnzzStoreType = ItemzzStoreDataType<T> & {
    add(item: T): void
}

const useWuColumnzzStore = create<WuColumnzzStoreType>(function (set, get) {
    const data = makeItemzzStoreData(set, get, makeWuColumnCRUD())
    return {
        ...data,
        add(item: T) {
            set((state) => {
                const itemzz = [...state.itemzz, item]
                return { itemzz }
            })
        },
    }
})

export default useWuColumnzzStore
