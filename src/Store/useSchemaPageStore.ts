import makeSideBarStoreData, { SideBarDataType } from "@/Factory/makeSideBarStoreData"
import create from "zustand"

type T = LB.Schema

interface SchemaPageStoreType extends SideBarDataType<T> {
    actionTab: string
    fileColor: string
    settingTab: string
    setActionTab(actionTab: string): void
    setFileColor(fileColor: string): void
    setSettingTab(settingTab: string): void
}

const useSchemaPageStore = create<SchemaPageStoreType>(function (set) {
    const data = makeSideBarStoreData<SchemaPageStoreType>(set)
    return {
        ...data,
        actionTab: "Cache",
        fileColor: "#fff",
        settingTab: "Column",
        tab: "Setting",
        setActionTab(actionTab: string) {
            set({ actionTab })
        },
        setFileColor(fileColor: string) {
            set({ fileColor })
        },
        setSettingTab(settingTab: string) {
            set({ settingTab })
        },
    }
})

export default useSchemaPageStore
