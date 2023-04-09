import { makeFileCRUD } from "@/Database/makeCRUD"
import makeNamedItemzzStoreData, {
    NamedItemzzStoreDataType,
} from "@/Factory/makeNamedItemzzStoreData"
import create from "zustand"

type T = LB.File

type FilezzStoreType = NamedItemzzStoreDataType<T>

const useFilezzStore = create<FilezzStoreType>(function (set, get) {
    const data = makeNamedItemzzStoreData(set, get, makeFileCRUD())
    return data
})

export default useFilezzStore
