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
import usePathzzStore from "@/Store/usePathzzStore"

export default function FlowView() {
    const sEntityPageStore = useEntityPageStore()
    const sFlowPageStore = useFlowPageStore()
    const sModulePageStore = useModulePageStore()
    const susePathzzStore = usePathzzStore()

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

    function makeView() {
        if (sEntityPageStore.item == null) {
            return <div>Select an Entity</div>
        }

        if (sModulePageStore.item == null) {
            return <div>Select a Module</div>
        }

        if (sFlowPageStore.step === StepEnum.Module) {
            return <ModuleDetail item={sModulePageStore.item}></ModuleDetail>
        }

        if (sFlowPageStore.ma == null) {
            return <div>Select or create an Action</div>
        }

        if (sFlowPageStore.step === StepEnum.Action) {
            return (
                <ActionView
                    entity={sEntityPageStore.item}
                    ma={sFlowPageStore.ma}
                    module={sModulePageStore.item}
                ></ActionView>
            )
        }

        const path = susePathzzStore.itemzz.find(function (item) {
            return (
                item.entityId === sEntityPageStore.item?.id &&
                item.moduleId === sModulePageStore.item?.id &&
                item.moduleActionId === sFlowPageStore.ma?.id
            )
        })

        if (sFlowPageStore.step === StepEnum.Path) {
            return (
                <PathView
                    entity={sEntityPageStore.item}
                    ma={sFlowPageStore.ma}
                    module={sModulePageStore.item}
                    path={path}
                ></PathView>
            )
        }

        if (sFlowPageStore.step === StepEnum.Request) {
            return (
                <ActionRequest
                    action={sFlowPageStore.action}
                    entity={sEntityPageStore.item}
                    ma={sFlowPageStore.ma}
                    module={sModulePageStore.item}
                    step={sFlowPageStore.step}
                ></ActionRequest>
            )
        }

        if (sFlowPageStore.step === StepEnum.Response) {
            return (
                <ResponseList
                    entity={sEntityPageStore.item}
                    ma={sFlowPageStore.ma}
                    module={sModulePageStore.item}
                    path={path}
                    step={sFlowPageStore.step}
                ></ResponseList>
            )
        }

        if (sFlowPageStore.step === StepEnum.File) {
            return (
                <FileTabList
                    entity={sEntityPageStore.item}
                    ma={sFlowPageStore.ma}
                    module={sModulePageStore.item}
                    step={sFlowPageStore.step}
                ></FileTabList>
            )
        }

        return null
    }

    return (
        <div>
            <div className="position-fixed bg-white w-100" style={{ zIndex: 111 }}>
                <div className="pt-3 ps-3 d-flex align-items-baseline" style={{ backgroundColor }}>
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

            {makeView()}
        </div>
    )
}
