import create from "zustand"

type SettingStoreType = LB.Setting & {}

const useSettingStore = create<SettingStoreType>(function (set) {
    return {}
})

export default useSettingStore
