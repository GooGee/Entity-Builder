import makeSideBarStoreData, {
    SideBarDataType,
} from "@/Factory/makeSideBarStoreData"
import create from "zustand"

type T = LB.Collection

interface CollectionPageStoreType extends SideBarDataType<T> {}

const useCollectionPageStore = create<CollectionPageStoreType>(function (set) {
    const data = makeSideBarStoreData<CollectionPageStoreType>(set)
    return data
})

export default useCollectionPageStore
