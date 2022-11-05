import makeSideBarStoreData, { SideBarDataType } from "@/Factory/makeSideBarStoreData"
import create from "zustand"

type T = LB.Path

interface PathPageStoreType extends SideBarDataType<T> {
    moduleId: number
    setModuleId(moduleId: number): void
}

const usePathPageStore = create<PathPageStoreType>(function (set) {
    return {
        ...makeSideBarStoreData<PathPageStoreType>(set),
        moduleId: 1,
        setModuleId(moduleId: number) {
            set({ moduleId, item: undefined })
        },
    }
})

export default usePathPageStore
