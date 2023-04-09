import makeRightModalData, { RightModalDataType } from "@/Factory/makeRightModalData"
import create from "zustand"

function CB(text: string) {}

type ImportModalStoreType = RightModalDataType & {
    callback(text: string): void
    openCB(
        itemId: number,
        title?: string,
        message?: string,
        callback?: (text: string) => void,
    ): void
}

const useImportModalStore = create<ImportModalStoreType>(function (set) {
    const data = makeRightModalData<ImportModalStoreType>(set)
    return {
        ...data,
        callback: CB,
        openCB(
            itemId: number,
            title: string = "",
            message: string = "paste JSON array here",
            callback = CB,
        ) {
            set({
                isOpen: true,
                itemId,
                title,
                message,
                callback,
            })
        },
    }
})

export default useImportModalStore
