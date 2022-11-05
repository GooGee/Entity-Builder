import { makeParameterCRUD } from "@/Database/makeCRUD"
import makeNamedItemzzStoreData, {
    NamedItemzzStoreDataType,
} from "@/Factory/makeNamedItemzzStoreData"
import create from "zustand"

type T = LB.Parameter

type ParameterzzStoreType = NamedItemzzStoreDataType<T>

const useParameterzzStore = create<ParameterzzStoreType>(function (set, get) {
    const data = makeNamedItemzzStoreData(set, get, makeParameterCRUD())
    return data
})

export default useParameterzzStore
