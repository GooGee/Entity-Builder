import makeSideBarStoreData, { SideBarDataType } from "@/Factory/makeSideBarStoreData"
import create from "zustand"

type T = LB.Module

interface ModulePageStoreType extends SideBarDataType<T> {}

const useModulePageStore = create<ModulePageStoreType>(function (set) {
    return makeSideBarStoreData<ModulePageStoreType>(set)
})

export default useModulePageStore
