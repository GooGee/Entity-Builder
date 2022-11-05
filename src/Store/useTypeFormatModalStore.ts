import makeRightModalData, { RightModalDataType } from "@/Factory/makeRightModalData"
import create from "zustand"

type TypeFormatModalStoreType = RightModalDataType & {
    item?: LB.TypeFormat
    wuId?: number
    update(item: LB.TypeFormat): void
    show(
        item: LB.TypeFormat,
        callback: (item: LB.TypeFormat) => void,
        wuId?: number,
    ): void
}

const useTypeFormatModalStore = create<TypeFormatModalStoreType>(function (set) {
    const data = makeRightModalData<TypeFormatModalStoreType>(set)
    return {
        ...data,
        update(item: LB.TypeFormat) {},
        show(
            item: LB.TypeFormat,
            callback: (item: LB.TypeFormat) => void,
            wuId?: number,
        ) {
            function update(item: LB.TypeFormat) {
                callback(item)
                set({ item })
            }
            set({ isOpen: true, item, update, wuId })
        },
    }
})

export default useTypeFormatModalStore
