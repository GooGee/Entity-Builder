import { makeServerCRUD } from "@/Database/makeCRUD"
import makeNamedItemzzStoreData, {
    NamedItemzzStoreDataType,
} from "@/Factory/makeNamedItemzzStoreData"
import create from "zustand"

type T = LB.Server

type ServerzzStoreType = NamedItemzzStoreDataType<T>

const useServerzzStore = create<ServerzzStoreType>(function (set, get) {
    const data = makeNamedItemzzStoreData(set, get, makeServerCRUD())
    return data
})

export default useServerzzStore
