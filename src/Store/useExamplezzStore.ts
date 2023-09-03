import { makeExampleCRUD } from "@/Database/makeCRUD"
import makeNamedItemzzStoreData, {
    NamedItemzzStoreDataType,
} from "@/Factory/makeNamedItemzzStoreData"
import create from "zustand"

type T = LB.Example

type ExamplezzStoreType = NamedItemzzStoreDataType<T>

const useExamplezzStore = create<ExamplezzStoreType>(function (set, get) {
    const data = makeNamedItemzzStoreData(set, get, makeExampleCRUD())
    return {
        ...data,
        sorting: true,
    }
})

export default useExamplezzStore
