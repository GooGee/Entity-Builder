import makeRightModalData, {
    RightModalDataType,
} from "@/Factory/makeRightModalData"
import create from "zustand"

type RelationModalStoreType = RightModalDataType

const useRelationModalStore = create<RelationModalStoreType>(function (set) {
    return makeRightModalData<RelationModalStoreType>(set)
})

export default useRelationModalStore
