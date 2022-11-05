import { makeWuChildCRUD } from "@/Database/makeCRUD"
import makeItemzzStoreData, { ItemzzStoreDataType } from "@/Factory/makeItemzzStoreData"
import create from "zustand"

type T = LB.WuChild

type WuChildzzStoreType = ItemzzStoreDataType<T> & {
    add(item: T): void
}

const useWuChildzzStore = create<WuChildzzStoreType>(function (set, get) {
    const data = makeItemzzStoreData(set, get, makeWuChildCRUD())
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

export default useWuChildzzStore
