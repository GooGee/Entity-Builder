import { makeRelationCRUD } from "@/Database/makeCRUD"
import makeItemzzStoreData, { ItemzzStoreDataType } from "@/Factory/makeItemzzStoreData"
import create from "zustand"

type T = LB.Relation

type RelationzzStoreType = ItemzzStoreDataType<T>

const useRelationzzStore = create<RelationzzStoreType>(function (set, get) {
    const data = makeItemzzStoreData(set, get, makeRelationCRUD())
    return data
})

export default useRelationzzStore
