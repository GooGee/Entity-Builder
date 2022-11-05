import makeRightModalData, {
    RightModalDataType,
} from "@/Factory/makeRightModalData"
import create from "zustand"

type ColumnModalStoreType = RightModalDataType

const useColumnModalStore = create<ColumnModalStoreType>(function (set) {
    return makeRightModalData<ColumnModalStoreType>(set)
})

export default useColumnModalStore
