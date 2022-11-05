import makeRightModalData, {
    RightModalDataType,
} from "@/Factory/makeRightModalData"
import create from "zustand"

type SchemaModalStoreType = RightModalDataType

const useSchemaModalStore = create<SchemaModalStoreType>(function (set) {
    return makeRightModalData<SchemaModalStoreType>(set)
})

export default useSchemaModalStore
