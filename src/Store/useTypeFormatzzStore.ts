import { makeTypeFormatCRUD } from "@/Database/makeCRUD"
import makeItemzzStoreData, { ItemzzStoreDataType } from "@/Factory/makeItemzzStoreData"
import create from "zustand"

type T = LB.TypeFormat

type TypeFormatzzStoreType = ItemzzStoreDataType<T>

const useTypeFormatzzStore = create<TypeFormatzzStoreType>(function (set, get) {
    const data = makeItemzzStoreData(set, get, makeTypeFormatCRUD())
    return data
})

export default useTypeFormatzzStore
