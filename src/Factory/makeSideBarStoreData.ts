import ColorEnum from "@/Model/ColorEnum"

export interface SideBarDataType<K extends LB.SideBarItem = LB.SideBarItem> {
    item?: K
    color: string
    keyword: string
    tab: string
    search(keyword: string): void
    setColor(color: string): void
    setItem(item?: K): void
    setTab(tab: string): void
}

export default function makeSideBarStoreData<
    T extends SideBarDataType<K>,
    K extends LB.SideBarItem = LB.SideBarItem
>(set: (object: T) => void) {
    const data = {
        item: undefined,
        keyword: "",
        tab: "",
        color: ColorEnum.white,
        search(keyword: string) {
            set({ keyword } as T)
        },
        setColor(color: string) {
            set({ color } as T)
        },
        setItem(item?: K) {
            set({ item } as T)
        },
        setTab(tab: string) {
            set({ tab } as T)
        },
    }
    return data
}
