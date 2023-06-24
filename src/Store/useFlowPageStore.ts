import create from "zustand"

export enum StepEnum {
    // None = "None",
    Module = "Module",
    Path = "Path",
    Action = "Action",
    Request = "Request",
    Response = "Response",
    File = "File",
}

interface FlowPageStoreType {
    action: string
    ma?: LB.ModuleAction
    path?: LB.Path
    step: StepEnum
    setAction(action: string, ma?: LB.ModuleAction): void
    setPath(path?: LB.Path): void
    setStep(step: StepEnum): void
}

const useFlowPageStore = create<FlowPageStoreType>(function (set) {
    const data = {
        action: "",
        ma: undefined,
        path: undefined,
        step: StepEnum.File,
        setAction(action: string, ma?: LB.ModuleAction) {
            set({ action, ma })
        },
        setPath(path?: LB.Path) {
            set({ path })
        },
        setStep(step: StepEnum) {
            set({ step })
        },
    }
    return data
})

export default useFlowPageStore
