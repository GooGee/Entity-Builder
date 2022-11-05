import makeRightModalData, { RightModalDataType } from "@/Factory/makeRightModalData"
import create from "zustand"

function CB(text: string) {}

type ListModalStoreType = RightModalDataType & {
    namezz: string[]
    callback(text: string): void
    openCB(title: string, namezz: string[], callback?: (text: string) => void): void
}

const useListModalStore = create<ListModalStoreType>(function (set) {
    const data = makeRightModalData<ListModalStoreType>(set)
    return {
        ...data,
        namezz: [],
        callback: CB,
        openCB(title: string, namezz: string[], callback = CB) {
            set({
                isOpen: true,
                namezz,
                title,
                callback,
            } as ListModalStoreType)
        },
    }
})

export default useListModalStore
