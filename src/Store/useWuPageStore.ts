import makeSideBarStoreData, { SideBarDataType } from "@/Factory/makeSideBarStoreData"
import create from "zustand"

type T = LB.Wu

interface WuPageStoreType extends SideBarDataType<T> {}

const useWuPageStore = create<WuPageStoreType>(function (set) {
    const data = makeSideBarStoreData<WuPageStoreType>(set)
    return {
        ...data,
        tab: "Column",
    }
})

export default useWuPageStore
