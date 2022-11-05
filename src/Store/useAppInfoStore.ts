import create from "zustand"

type AppInfoStoreType = {
    connected: boolean
    isDemo: boolean
    ide: string
    setConnected(connected?: boolean, isDemo?: boolean): void
    setIde(ide: string): void
}

const useAppInfoStore = create<AppInfoStoreType>(function (set) {
    const data = {
        connected: false,
        isDemo: false,
        ide: "",
        setConnected(connected = true, isDemo = false) {
            set({ connected, isDemo })
        },
        setIde(ide: string) {
            set({ ide })
        },
    }
    return data
})

export default useAppInfoStore
