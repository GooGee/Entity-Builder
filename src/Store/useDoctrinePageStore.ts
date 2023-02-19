import makeSideBarStoreData, {
    SideBarDataType,
} from "@/Factory/makeSideBarStoreData"
import create from "zustand"

type T = LB.DoctrineColumnType

interface DoctrinePageStoreType extends SideBarDataType<T> {}

const useDoctrinePageStore = create<DoctrinePageStoreType>(function (set) {
    const data = makeSideBarStoreData<DoctrinePageStoreType>(set)
    return data
})

export default useDoctrinePageStore
