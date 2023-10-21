import makeRightModalData, { RightModalDataType } from "@/Factory/makeRightModalData"
import create from "zustand"

function CB(text: string) {}

type ImportModalStoreType = RightModalDataType & {
    example: string
    callback(text: string): void
    openCB(
        itemId: number,
        title?: string,
        message?: string,
        callback?: (text: string) => void,
        example?: string,
    ): void
}

const useImportModalStore = create<ImportModalStoreType>(function (set) {
    const data = makeRightModalData<ImportModalStoreType>(set)
    return {
        ...data,
        example: "",
        callback: CB,
        openCB(
            itemId: number,
            title: string = "",
            message: string = "paste JSON array here",
            callback = CB,
            example: string = "",
        ) {
            set({
                isOpen: true,
                itemId,
                title,
                message,
                example,
                callback,
            })
        },
    }
})

export default useImportModalStore
