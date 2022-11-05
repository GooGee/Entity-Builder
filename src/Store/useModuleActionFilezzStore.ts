import { makeModuleActionFileCRUD } from "@/Database/makeCRUD"
import makeItemzzStoreData, { ItemzzStoreDataType } from "@/Factory/makeItemzzStoreData"
import create from "zustand"

type T = LB.ModuleActionFile

type ModuleActionFilezzStoreType = ItemzzStoreDataType<T>

const useModuleActionFilezzStore = create<ModuleActionFilezzStoreType>(function (set, get) {
    const data = makeItemzzStoreData(set, get, makeModuleActionFileCRUD())
    return data
})

export default useModuleActionFilezzStore
