import makeSideBarStoreData, { SideBarDataType } from "@/Factory/makeSideBarStoreData"
import create from "zustand"

type T = LB.Response

interface ResponsePageStoreType extends SideBarDataType<T> {}

const useResponsePageStore = create<ResponsePageStoreType>(function (set) {
    return makeSideBarStoreData<ResponsePageStoreType>(set)
})

export default useResponsePageStore
