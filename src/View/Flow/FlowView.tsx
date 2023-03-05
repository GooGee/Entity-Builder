import { makeModuleCRUD } from "@/Database/makeCRUD"
import useEntityPageStore from "@/Store/useEntityPageStore"
import useFlowPageStore, { StepEnum } from "@/Store/useFlowPageStore"
import useModulePageStore from "@/Store/useModulePageStore"
import { useEffect } from "react"
import TabList from "../Part/TabList"
import ActionList from "./ActionList"
import ActionRequest from "./ActionRequest"
import FileTabList from "./FileTabList"
import PathList from "./PathList"
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

    function makeView(title: string) {
        return <h3 className="pointer hover-blue c-secondary">{title}</h3>
    }

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
                    <div className="me-3">
                        Module {sModulePageStore.item?.name ?? null}
                    </div>

                    <TabList
                        tab={sFlowPageStore.step}
                        tabzz={stepzz}
                        setTab={sFlowPageStore.setStep}
                    ></TabList>
                </div>
            </div>

            <div style={{ height: "77px" }}></div>

            <div>
                {sModulePageStore.item ? (
                    <PathList
                        entity={sEntityPageStore.item}
                        module={sModulePageStore.item}
                    ></PathList>
                ) : (
                    makeView(StepEnum.Path)
                )}
            </div>
            <div>
                {sModulePageStore.item ? (
                    <ActionList
                        entity={sEntityPageStore.item}
                        module={sModulePageStore.item}
                    ></ActionList>
                ) : (
                    makeView(StepEnum.Action)
                )}
            </div>
            <div>
                {sFlowPageStore.ma && sModulePageStore.item && sFlowPageStore.path ? (
                    <ActionRequest
                        action={sFlowPageStore.action}
                        entity={sEntityPageStore.item}
                        ma={sFlowPageStore.ma}
                        module={sModulePageStore.item}
                        step={sFlowPageStore.step}
                    ></ActionRequest>
                ) : (
                    makeView(StepEnum.Request)
                )}
            </div>
            <div>
                {sFlowPageStore.ma && sModulePageStore.item && sFlowPageStore.path ? (
                    <ResponseList
                        action={sFlowPageStore.action}
                        entity={sEntityPageStore.item}
                        ma={sFlowPageStore.ma}
                        module={sModulePageStore.item}
                        step={sFlowPageStore.step}
                    ></ResponseList>
                ) : (
                    makeView(StepEnum.Response)
                )}
            </div>
            <div className="mb-5">
                {sFlowPageStore.ma && sModulePageStore.item ? (
                    <FileTabList
                        action={sFlowPageStore.action}
                        entity={sEntityPageStore.item}
                        ma={sFlowPageStore.ma}
                        module={sModulePageStore.item}
                        step={sFlowPageStore.step}
                    ></FileTabList>
                ) : (
                    makeView(StepEnum.File)
                )}
            </div>
        </div>
    )
}
