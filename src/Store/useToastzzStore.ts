import getAxiosErrorMessage from "@/Service/getAxiosErrorMessage"
import create from "zustand"

class Toast {
    private static index = 0

    readonly id

    constructor(readonly text: string, readonly color: string) {
        Toast.index += 1
        this.id = Toast.index
    }
}

type ToastzzStore = {
    list: Toast[]
    create(text: string, color?: string, ttl?: number): void
    dismiss(id: number): void
    showDanger(text: string): void
    showError(error: unknown): void
    showOK(): void
    showSuccess(text: string): void
    showWarning(text: string): void
}

const useToastzzStore = create<ToastzzStore>(function (set, get) {
    const data = {
        list: [] as Toast[],
        create(text: string, color: string = "", ttl: number = 3222) {
            const item = new Toast(text.slice(0, 333), color)
            set((state) => {
                const list = state.list.concat(item)
                return { list }
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
        showDanger(text: string) {
            get().create(text, "text-danger", 0)
        },
        showError(error: unknown) {
            console.log(error)
            const text = getAxiosErrorMessage(error)
            get().showDanger(text)
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
