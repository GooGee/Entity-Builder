import makeSideBarStoreData, { SideBarDataType } from "@/Factory/makeSideBarStoreData"
import create from "zustand"

type T = LB.Variable

interface VariablePageStoreType extends SideBarDataType<T> {}

const useVariablePageStore = create<VariablePageStoreType>(function (set) {
    return makeSideBarStoreData<VariablePageStoreType>(set)
})

export default useVariablePageStore
