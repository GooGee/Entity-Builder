import { makeWuParameterCRUD } from "@/Database/makeCRUD"
import makeNamedItemzzStoreData, {
    NamedItemzzStoreDataType,
} from "@/Factory/makeNamedItemzzStoreData"
import create from "zustand"

type T = LB.WuParameter

export type WuParameterzzStoreType = NamedItemzzStoreDataType<T> & {
    add(item: T): void
}

const useWuParameterzzStore = create<WuParameterzzStoreType>(function (set, get) {
    const data = makeNamedItemzzStoreData(set, get, makeWuParameterCRUD())
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

export default useWuParameterzzStore
