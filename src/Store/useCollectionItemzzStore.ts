import { makeCollectionItemCRUD } from "@/Database/makeCRUD"
import makeItemzzStoreData, { ItemzzStoreDataType } from "@/Factory/makeItemzzStoreData"
import create from "zustand"

type T = LB.CollectionItem

type CollectionItemzzStoreType = ItemzzStoreDataType<T>

const useCollectionItemzzStore = create<CollectionItemzzStoreType>(function (set, get) {
    const data = makeItemzzStoreData(set, get, makeCollectionItemCRUD())
    return data
})

export default useCollectionItemzzStore
