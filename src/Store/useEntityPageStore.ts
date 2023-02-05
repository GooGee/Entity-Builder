import makeSideBarStoreData, { SideBarDataType } from "@/Factory/makeSideBarStoreData"
import create from "zustand"

type T = LB.Entity

interface EntityPageStoreType extends SideBarDataType<T> {
    fileColor: string
    setFileColor(fileColor: string): void
}

const useEntityPageStore = create<EntityPageStoreType>(function (set) {
    const data = makeSideBarStoreData<EntityPageStoreType>(set)
    return {
        ...data,
        fileColor: "#fff",
        tab: "Column",
        setFileColor(fileColor: string) {
            set({ fileColor })
        },
    }
})

export default useEntityPageStore
