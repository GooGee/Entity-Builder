import getAxiosErrorMessage from "@/Service/getAxiosErrorMessage"
import create from "zustand"

export class Toast {
    private static index = 0

    readonly id
    readonly date = new Date()

    constructor(
        readonly text: string,
        readonly color: string,
        readonly detail?: string,
    ) {
        Toast.index += 1
        this.id = Toast.index
    }
}

type ToastzzStore = {
    itemzz: Toast[]
    list: Toast[]
    create(text: string, color?: string, ttl?: number, detail?: string): void
    dismiss(id: number): void
    showDanger(text: string, detail?: string): void
    showError(error: unknown): void
    showOK(): void
    showSuccess(text: string): void
    showWarning(text: string): void
}

const useToastzzStore = create<ToastzzStore>(function (set, get) {
    const data = {
        itemzz: [] as Toast[],
        list: [] as Toast[],
        create(text: string, color: string = "", ttl: number = 3222, detail?: string) {
            const item = new Toast(text.slice(0, 333), color, detail)
            set((state) => {
                return {
                    itemzz: state.itemzz.concat(item),
                    list: state.list.concat(item),
                }
            })
            if (ttl > 0) {
                setTimeout(() => get().dismiss(item.id), ttl)
            }
        },
        dismiss(id: number) {
            set((state) => {
                const list = state.list.filter((item) => item.id !== id)
                return { list }
            })
        },
        showDanger(text: string, detail?: string) {
            get().create(text, "text-danger", 0, detail)
        },
        showError(error: unknown) {
            console.log(error)
            const text = getAxiosErrorMessage(error)
            const detail = typeof error === "string" ? undefined : JSON.stringify(error)
            get().showDanger(text, detail)
        },
        showOK() {
            get().showSuccess("OK")
        },
        showSuccess(text: string) {
            get().create(text, "text-success")
        },
        showWarning(text: string) {
            get().create(text, "text-warning", 0)
        },
    }
    return data
})

export default useToastzzStore
