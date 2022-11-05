import ColorEnum from "@/Model/ColorEnum"
import create from "zustand"

type TreeStoreType = {
    color: string
    directoryId: number
    fileId: number
    keyword: string
    hide(): void
    search(keyword: string): void
    setColor(color: string): void
    showDirectory(directoryId: number): void
    showFile(fileId: number): void
}

const useTreeStore = create<TreeStoreType>(function (set) {
    const data = {
        color: ColorEnum.white,
        directoryId: 0,
        fileId: 0,
        keyword: "",
        hide() {
            set({
                directoryId: 0,
                fileId: 0,
            })
        },
        search(keyword: string) {
            set({
                directoryId: 0,
                fileId: 0,
                keyword,
            })
        },
        setColor(color: string) {
            set({
                directoryId: 0,
                fileId: 0,
                color,
            })
        },
        showDirectory(directoryId: number) {
            set({
                directoryId,
                fileId: 0,
            })
        },
        showFile(fileId: number) {
            set({
                directoryId: 0,
                fileId,
            })
        },
    }
    return data
})

export default useTreeStore
