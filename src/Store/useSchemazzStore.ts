import { makeSchemaCRUD } from "@/Database/makeCRUD"
import makeNamedItemzzStoreData, {
    NamedItemzzStoreDataType,
} from "@/Factory/makeNamedItemzzStoreData"
import create from "zustand"

type T = LB.Schema

type SchemazzStoreType = NamedItemzzStoreDataType<T> & {
    add(item: T): void
}

const useSchemazzStore = create<SchemazzStoreType>(function (set, get) {
    const data = makeNamedItemzzStoreData(set, get, makeSchemaCRUD())
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

export default useSchemazzStore
