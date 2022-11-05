import { makeColumnCRUD } from "@/Database/makeCRUD"
import makeItemzzStoreData, { ItemzzStoreDataType } from "@/Factory/makeItemzzStoreData"
import create from "zustand"

type T = LB.Column

type ColumnzzStoreType = ItemzzStoreDataType<T>

const useColumnzzStore = create<ColumnzzStoreType>(function (set, get) {
    const data = makeItemzzStoreData(set, get, makeColumnCRUD())
    return data
})

export default useColumnzzStore
