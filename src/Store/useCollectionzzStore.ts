import { makeCollectionCRUD } from "@/Database/makeCRUD"
import makeNamedItemzzStoreData, {
    NamedItemzzStoreDataType,
} from "@/Factory/makeNamedItemzzStoreData"
import create from "zustand"

type T = LB.Collection

type CollectionzzStoreType = NamedItemzzStoreDataType<T>

const useCollectionzzStore = create<CollectionzzStoreType>(function (set, get) {
    const data = makeNamedItemzzStoreData(set, get, makeCollectionCRUD())
    return data
})

export default useCollectionzzStore
