import { makeVariableCRUD } from "@/Database/makeCRUD"
import makeNamedItemzzStoreData, {
    NamedItemzzStoreDataType,
} from "@/Factory/makeNamedItemzzStoreData"
import create from "zustand"

type T = LB.Variable

export type VariablezzStoreType = NamedItemzzStoreDataType<T>

const useVariablezzStore = create<VariablezzStoreType>(function (set, get) {
    const data = makeNamedItemzzStoreData(set, get, makeVariableCRUD())
    return {
        ...data,
        sorting: true,
    }
})

export default useVariablezzStore
