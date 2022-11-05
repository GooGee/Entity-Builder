import { makeModuleCRUD } from "@/Database/makeCRUD"
import makeNamedItemzzStoreData, {
    NamedItemzzStoreDataType,
} from "@/Factory/makeNamedItemzzStoreData"
import create from "zustand"

type T = LB.Module

type ModulezzStoreType = NamedItemzzStoreDataType<T>

const useModulezzStore = create<ModulezzStoreType>(function (set, get) {
    const data = makeNamedItemzzStoreData(set, get, makeModuleCRUD())
    return data
})

export default useModulezzStore
