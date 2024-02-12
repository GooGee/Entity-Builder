import { makeModuleCRUD } from "@/Database/makeCRUD"
import useEntityPageStore from "@/Store/useEntityPageStore"
import useFlowPageStore, { StepEnum } from "@/Store/useFlowPageStore"
import useModulePageStore from "@/Store/useModulePageStore"
import { useEffect } from "react"
import TabList from "../Part/TabList"
import ActionRequest from "./ActionRequest"
import ActionView from "./ActionView"
import FileTabList from "./FileTabList"
import ModuleDetail from "./ModuleDetail"
import PathView from "./PathView"
import ResponseList from "./ResponseList"

export default function FlowView() {
    const sEntityPageStore = useEntityPageStore()
    const sFlowPageStore = useFlowPageStore()
    const sModulePageStore = useModulePageStore()

    useEffect(() => {
        if (sModulePageStore.item === undefined) {
            makeModuleCRUD()
                .findAll()
                .then((itemzz) => sModulePageStore.setItem(itemzz[0]))
        }
    }, [])

    if (sEntityPageStore.item === undefined) {
        return null
    }

    const stepzz = Object.keys(StepEnum) as StepEnum[]

    let backgroundColor = "white"
    if (sModulePageStore.item) {
        backgroundColor = sModulePageStore.item.color + 2
    }

    return (
        <div>
            <div className="position-fixed bg-white w-100" style={{ zIndex: 111 }}>
                <div
                    className="pt-3 ps-3 d-flex align-items-baseline"
                    style={{ backgroundColor }}
                >
                    <TabList
                        tab={sFlowPageStore.step}
                        tabzz={stepzz}
                        setTab={function (tab: StepEnum) {
                            sFlowPageStore.setStep(tab)
                        }}
                    ></TabList>
                </div>
            </div>

            <div style={{ height: "77px" }}></div>

            {sModulePageStore.item && sFlowPageStore.step === StepEnum.Module ? (
                <ModuleDetail item={sModulePageStore.item}></ModuleDetail>
            ) : null}

            {sModulePageStore.item &&
            sFlowPageStore.step === StepEnum.Path ? (
                <PathView
                    entity={sEntityPageStore.item}
                    module={sModulePageStore.item}
                ></PathView>
            ) : null}

            {sModulePageStore.item &&
            sFlowPageStore.ma &&
            sFlowPageStore.step === StepEnum.Action ? (
                <ActionView
                    entity={sEntityPageStore.item}
                    ma={sFlowPageStore.ma}
                    module={sModulePageStore.item}
                ></ActionView>
            ) : null}

            {sFlowPageStore.ma &&
            sModulePageStore.item &&
            sFlowPageStore.path &&
            sFlowPageStore.step === StepEnum.Request ? (
                <ActionRequest
                    action={sFlowPageStore.action}
                    entity={sEntityPageStore.item}
                    ma={sFlowPageStore.ma}
                    module={sModulePageStore.item}
                    step={sFlowPageStore.step}
                ></ActionRequest>
            ) : null}

            {sFlowPageStore.ma &&
            sModulePageStore.item &&
            sFlowPageStore.path &&
            sFlowPageStore.step === StepEnum.Response ? (
                <ResponseList
                    action={sFlowPageStore.action}
                    entity={sEntityPageStore.item}
                    ma={sFlowPageStore.ma}
                    module={sModulePageStore.item}
                    step={sFlowPageStore.step}
                ></ResponseList>
            ) : null}

            {sFlowPageStore.ma &&
            sModulePageStore.item &&
            sFlowPageStore.step === StepEnum.File ? (
                <FileTabList
                    action={sFlowPageStore.action}
                    entity={sEntityPageStore.item}
                    ma={sFlowPageStore.ma}
                    module={sModulePageStore.item}
                    step={sFlowPageStore.step}
                ></FileTabList>
            ) : null}
        </div>
    )
}
