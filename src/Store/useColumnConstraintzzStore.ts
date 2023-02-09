import { makeColumnConstraintCRUD } from "@/Database/makeCRUD"
import makeItemzzStoreData, { ItemzzStoreDataType } from "@/Factory/makeItemzzStoreData"
import create from "zustand"

type T = LB.ColumnConstraint

type ColumnConstraintzzStoreType = ItemzzStoreDataType<T>

const useColumnConstraintzzStore = create<ColumnConstraintzzStoreType>(function (set, get) {
    const data = makeItemzzStoreData(set, get, makeColumnConstraintCRUD())
    return data
})

export default useColumnConstraintzzStore
