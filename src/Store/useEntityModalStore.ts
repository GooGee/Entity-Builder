import makeRightModalData, {
    RightModalDataType,
} from "@/Factory/makeRightModalData"
import create from "zustand"

type EntityModalStoreType = RightModalDataType

const useEntityModalStore = create<EntityModalStoreType>(function (set) {
    return makeRightModalData<EntityModalStoreType>(set)
})

export default useEntityModalStore
