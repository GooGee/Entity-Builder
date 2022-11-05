import { makeResponseCRUD } from "@/Database/makeCRUD"
import makeNamedItemzzStoreData, {
    NamedItemzzStoreDataType,
} from "@/Factory/makeNamedItemzzStoreData"
import create from "zustand"

type T = LB.Response

type ResponsezzStoreType = NamedItemzzStoreDataType<T>

const useResponsezzStore = create<ResponsezzStoreType>(function (set, get) {
    const data = makeNamedItemzzStoreData(set, get, makeResponseCRUD())
    return data
})

export default useResponsezzStore
