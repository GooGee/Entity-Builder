export interface RightModalDataType {
    isOpen: boolean
    itemId: number
    message: string
    title: string
    close(): void
    open(itemId: number, title?: string, message?: string): void
}

export default function makeRightModalData<T extends RightModalDataType>(
    set: (object: T) => void,
) {
    const data = {
        isOpen: false,
        itemId: 0,
        message: "",
        title: "",
        close() {
            set({ isOpen: false, itemId: 0 } as T)
        },
        open(itemId: number, title: string = "", message: string = "") {
            set({ isOpen: true, itemId, title, message } as T)
        },
    }
    return data
}
