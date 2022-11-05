import { makeFileCRUD } from "@/Database/makeCRUD"
import makeItemzzStoreData, { ItemzzStoreDataType } from "@/Factory/makeItemzzStoreData"
import create from "zustand"

type T = LB.File

type FilezzStoreType = ItemzzStoreDataType<T>

const useFilezzStore = create<FilezzStoreType>(function (set, get) {
    const data = makeItemzzStoreData(set, get, makeFileCRUD())
    return data
})

export default useFilezzStore
