import { makeColumnCRUD } from "@/Database/makeCRUD"
import makeNamedItemzzStoreData, {
    NamedItemzzStoreDataType,
} from "@/Factory/makeNamedItemzzStoreData"
import create from "zustand"

type T = LB.Column

type ColumnzzStoreType = NamedItemzzStoreDataType<T>

const useColumnzzStore = create<ColumnzzStoreType>(function (set, get) {
    const data = makeNamedItemzzStoreData(set, get, makeColumnCRUD())
    return data
})

export default useColumnzzStore
