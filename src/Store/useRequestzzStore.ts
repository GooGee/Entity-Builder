import { makeRequestCRUD } from "@/Database/makeCRUD"
import makeNamedItemzzStoreData, {
    NamedItemzzStoreDataType,
} from "@/Factory/makeNamedItemzzStoreData"
import create from "zustand"

type T = LB.Request

type RequestzzStoreType = NamedItemzzStoreDataType<T>

const useRequestzzStore = create<RequestzzStoreType>(function (set, get) {
    const data = makeNamedItemzzStoreData(set, get, makeRequestCRUD())
    return data
})

export default useRequestzzStore
