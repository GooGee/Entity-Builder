import makeSideBarStoreData, { SideBarDataType } from "@/Factory/makeSideBarStoreData"
import create from "zustand"

type T = LB.Parameter

interface ParameterPageStoreType extends SideBarDataType<T> {}

const useParameterPageStore = create<ParameterPageStoreType>(function (set) {
    return makeSideBarStoreData<ParameterPageStoreType>(set)
})

export default useParameterPageStore
