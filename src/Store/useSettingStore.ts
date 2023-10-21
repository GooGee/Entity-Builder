import create from "zustand"

type SettingStoreType = LB.Setting & {
    note: string
}

const useSettingStore = create<SettingStoreType>(function (set) {
    return {
        note: "",
    }
})

export default useSettingStore
