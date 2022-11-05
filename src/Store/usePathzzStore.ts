import { makePathCRUD } from "@/Database/makeCRUD"
import makeNamedItemzzStoreData, {
    NamedItemzzStoreDataType,
} from "@/Factory/makeNamedItemzzStoreData"
import create from "zustand"

type T = LB.Path

type PathzzStoreType = NamedItemzzStoreDataType<T>

const usePathzzStore = create<PathzzStoreType>(function (set, get) {
    const data = makeNamedItemzzStoreData(set, get, makePathCRUD())
    return data
})

export default usePathzzStore
