import { makeDirectoryCRUD } from "@/Database/makeCRUD"
import makeItemzzStoreData, { ItemzzStoreDataType } from "@/Factory/makeItemzzStoreData"
import makeLinkedTreeMap, { LinkedTreeNode } from "@/Factory/makeLinkedTreeMap"
import makeTreeHelper from "@/Factory/makeTreeHelper"
import create from "zustand"
import usePsr4Store from "./usePsr4Store"

type T = LB.Directory

type DirectoryStoreType = ItemzzStoreDataType<T> & {
    treeHelper: ReturnType<typeof makeTreeHelper>
    treeMap: Map<number, LinkedTreeNode<T>>
}

const useDirectoryzzStore = create<DirectoryStoreType>(function (set, get) {
    const data = makeItemzzStoreData(set, get, makeDirectoryCRUD(), function (itemzz) {
        const treeMap = makeLinkedTreeMap(itemzz)
        const treeHelper = makeTreeHelper(treeMap, usePsr4Store.getState().psr4)
        set({ treeHelper, treeMap })
    })

    const treeMap = new Map()
    const treeHelper = makeTreeHelper(treeMap, usePsr4Store.getState().psr4)
    return {
        ...data,
        treeHelper,
        treeMap,
    }
})

export default useDirectoryzzStore
