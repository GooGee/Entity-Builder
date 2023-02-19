import { makeDoctrineColumnTypeCRUD } from "@/Database/makeCRUD"
import makeNamedItemzzStoreData, {
    NamedItemzzStoreDataType,
} from "@/Factory/makeNamedItemzzStoreData"
import create from "zustand"

type T = LB.DoctrineColumnType

export type DoctrineColumnTypezzStoreType = NamedItemzzStoreDataType<T>

const useDoctrineColumnTypezzStore = create<DoctrineColumnTypezzStoreType>(function (
    set,
    get,
) {
    const data = makeNamedItemzzStoreData(set, get, makeDoctrineColumnTypeCRUD())
    return {
        ...data,
        sorting: true,
    }
})

export default useDoctrineColumnTypezzStore
