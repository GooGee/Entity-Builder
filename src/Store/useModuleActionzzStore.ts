import { makeModuleActionCRUD } from "@/Database/makeCRUD"
import makeItemzzStoreData, { ItemzzStoreDataType } from "@/Factory/makeItemzzStoreData"
import create from "zustand"

type T = LB.ModuleAction

type ModuleActionzzStoreType = ItemzzStoreDataType<T>

const useModuleActionzzStore = create<ModuleActionzzStoreType>(function (set, get) {
    const data = makeItemzzStoreData(set, get, makeModuleActionCRUD())
    return data
})

export default useModuleActionzzStore
