import create from "zustand"

export enum StepEnum {
    None = "None",
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
    module?: LB.Module
    path?: LB.Path
    step: StepEnum
    setAction(action: string, ma?: LB.ModuleAction): void
    setModule(module?: LB.Module): void
    setPath(path?: LB.Path): void
    setStep(step: StepEnum): void
}

const useFlowPageStore = create<FlowPageStoreType>(function (set) {
    const data = {
        action: "",
        ma: undefined,
        module: undefined,
        path: undefined,
        step: StepEnum.None,
        setAction(action: string, ma?: LB.ModuleAction) {
            set({ action, ma })
        },
        setModule(module?: LB.Module) {
            set({ module })
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
