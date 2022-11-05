import makeSideBarStoreData, { SideBarDataType } from "@/Factory/makeSideBarStoreData"
import create from "zustand"

type T = LB.Request

interface RequestPageStoreType extends SideBarDataType<T> {}

const useRequestPageStore = create<RequestPageStoreType>(function (set) {
    return makeSideBarStoreData<RequestPageStoreType>(set)
})

export default useRequestPageStore
