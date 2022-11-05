import makeRightModalData, { RightModalDataType } from "@/Factory/makeRightModalData"
import create from "zustand"

function CB(itemId: number) {}

type DirectoryModalStoreType = RightModalDataType & {
    callback(itemId: number): void
    openCB(title: string, callback?: (itemId: number) => void): void
    setItemId(itemId: number): void
}

const useDirectoryModalStore = create<DirectoryModalStoreType>(function (set) {
    const data = makeRightModalData<DirectoryModalStoreType>(set)
    return {
        ...data,
        callback: CB,
        openCB(title: string, callback = CB) {
            set({
                isOpen: true,
                title,
                callback,
            })
        },
        setItemId(itemId: number) {
            set({ itemId })
        },
    }
})

export default useDirectoryModalStore
