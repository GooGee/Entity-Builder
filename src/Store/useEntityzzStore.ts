import { makeEntityCRUD } from "@/Database/makeCRUD"
import makeNamedItemzzStoreData, {
    NamedItemzzStoreDataType,
} from "@/Factory/makeNamedItemzzStoreData"
import create from "zustand"

type T = LB.Entity

type EntityzzStoreType = NamedItemzzStoreDataType<T> & {
    add(item: T): void
}

const useEntityzzStore = create<EntityzzStoreType>(function (set, get) {
    const data = makeNamedItemzzStoreData(set, get, makeEntityCRUD())
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

export default useEntityzzStore
