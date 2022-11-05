import makeSideBarStoreData, { SideBarDataType } from "@/Factory/makeSideBarStoreData"
import create from "zustand"

type T = LB.Example

interface ExamplePageStoreType extends SideBarDataType<T> {}

const useExamplePageStore = create<ExamplePageStoreType>(function (set) {
    return makeSideBarStoreData<ExamplePageStoreType>(set)
})

export default useExamplePageStore
