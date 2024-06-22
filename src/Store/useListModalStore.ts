import makeRightModalData, { RightModalDataType } from "@/Factory/makeRightModalData"
import create from "zustand"

function CB(text: string) { }

type ListModalStoreType = RightModalDataType & {
    namezz: string[]
    text: string
    callback(text: string): void
    openCB(title: string, namezz: string[], callback: (text: string) => void): void
    setText(text: string): void
}

const useListModalStore = create<ListModalStoreType>(function (set) {
    const data = makeRightModalData<ListModalStoreType>(set)
    return {
        ...data,
        namezz: [],
        text: '',
        callback: CB,
        openCB(title: string, namezz: string[], callback: (text: string) => void) {
            set({
                isOpen: true,
                namezz,
                title,
                callback,
            } as ListModalStoreType)
        },
        setText(text: string) {
            set(function (item) {
                item.text = text
                return item
            })
        }
    }
})

export default useListModalStore
