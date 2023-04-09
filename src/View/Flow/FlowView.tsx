import { makeModuleCRUD } from "@/Database/makeCRUD"
import useEntityPageStore from "@/Store/useEntityPageStore"
import useFlowPageStore, { StepEnum } from "@/Store/useFlowPageStore"
import useModulePageStore from "@/Store/useModulePageStore"
import useModulezzStore from "@/Store/useModulezzStore"
import { useEffect, useRef } from "react"
import SelectButton from "../Button/SelectButton"
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
    const sModulezzStore = useModulezzStore()

    const rPath = useRef<HTMLDivElement>(null)
    const rAction = useRef<HTMLDivElement>(null)
    const rRequest = useRef<HTMLDivElement>(null)
    const rResponse = useRef<HTMLDivElement>(null)
    const rFile = useRef<HTMLDivElement>(null)

    const rmap = new Map([
        [StepEnum.Action, rAction],
        [StepEnum.File, rFile],
        [StepEnum.Path, rPath],
        [StepEnum.Request, rRequest],
        [StepEnum.Response, rResponse],
    ])

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
                        Module
                        <SelectButton
                            className="inline wa ms-1"
                            itemzz={sModulezzStore.itemzz}
                            value={sModulePageStore.item?.id ?? 0}
                            change={function (id, item) {
                                sModulePageStore.setItem(item)
                            }}
                        ></SelectButton>
                    </div>

                    <TabList
                        tab={sFlowPageStore.step}
                        tabzz={stepzz}
                        setTab={function (tab: StepEnum) {
                            sFlowPageStore.setStep(tab)
                            rmap.get(tab)?.current?.scrollIntoView()
                        }}
                    ></TabList>
                </div>
            </div>

            <div style={{ height: "77px" }}></div>

            <div ref={rPath}>
                {sModulePageStore.item ? (
                    <PathList
                        entity={sEntityPageStore.item}
                        module={sModulePageStore.item}
                    ></PathList>
                ) : (
                    makeView(StepEnum.Path)
                )}
            </div>
            <div ref={rAction}>
                {sModulePageStore.item ? (
                    <ActionList
                        entity={sEntityPageStore.item}
                        module={sModulePageStore.item}
                    ></ActionList>
                ) : (
                    makeView(StepEnum.Action)
                )}
            </div>
            <div ref={rRequest}>
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
            <div ref={rResponse}>
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
            <div ref={rFile} className="mb-5">
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
