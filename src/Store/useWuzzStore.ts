import { makeWuCRUD } from "@/Database/makeCRUD"
import makeNamedItemzzStoreData, {
    NamedItemzzStoreDataType,
} from "@/Factory/makeNamedItemzzStoreData"
import create from "zustand"

type T = LB.Wu

export type WuzzStoreType = NamedItemzzStoreDataType<T> & {
    add(item: T): void
}

const useWuzzStore = create<WuzzStoreType>(function (set, get) {
    const data = makeNamedItemzzStoreData(set, get, makeWuCRUD())
    return {
        ...data,
        sorting: true,
        add(item: T) {
            set((state) => {
                const itemzz = [...state.itemzz, item]
                return { itemzz }
            })
        },
    }
})

export default useWuzzStore
