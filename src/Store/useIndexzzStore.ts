import { makeIndexCRUD } from "@/Database/makeCRUD"
import makeItemzzStoreData, { ItemzzStoreDataType } from "@/Factory/makeItemzzStoreData"
import create from "zustand"

type T = LB.Index

type IndexzzStoreType = ItemzzStoreDataType<T>

const useIndexzzStore = create<IndexzzStoreType>(function (set, get) {
    const data = makeItemzzStoreData(set, get, makeIndexCRUD())
    return data
})

export default useIndexzzStore
