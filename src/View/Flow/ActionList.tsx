import makeModuleAction from "@/Database/Factory/makeModuleAction"
import { makeModuleActionCRUD, makeParameterMapCRUD } from "@/Database/makeCRUD"
import useDirectoryzzStore from "@/Store/useDirectoryzzStore"
import useFlowPageStore, { StepEnum } from "@/Store/useFlowPageStore"
import useModuleActionzzStore from "@/Store/useModuleActionzzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import { useEffect } from "react"
import showNameInput from "../Dialog/showNameInput"
import usePathzzStore from "@/Store/usePathzzStore"
import { getHttpMethod, makePathOf } from "@/Database/Factory/makePath"
import useColumnzzStore from "@/Store/useColumnzzStore"
import Constant from "@/Model/Constant"
import useFilezzStore from "@/Store/useFilezzStore"
import LayerEnum from "@/Model/LayerEnum"

const Step = StepEnum.Action

interface Property {
    entity: LB.Entity
    module: LB.Module
}

export default function ActionList(property: Property) {
    const suseFilezzStore = useFilezzStore()
    const sFlowPageStore = useFlowPageStore()
    const sModuleActionzzStore = useModuleActionzzStore()
    const sPathzzStore = usePathzzStore()

    const tabzz = suseFilezzStore.itemzz
        .filter((item) => item.layer === LayerEnum.Action)
        .sort((aa, bb) => aa.name.localeCompare(bb.name))
    const tab = tabzz.find((item) => sFlowPageStore.action === item.name)
    const nameset = new Set(tabzz.map((item) => item.name))

    const actionzz = sModuleActionzzStore.itemzz
        .filter(
            (item) =>
                item.directoryId === property.module.directoryId &&
                item.entityId === property.entity.id &&
                !nameset.has(item.name),
        )
        .sort((aa, bb) => aa.name.localeCompare(bb.name))

    useEffect(() => {
        if (
            sFlowPageStore.path?.entityId === property.entity.id &&
            sFlowPageStore.path?.moduleId === property.module.id
        ) {
            return
        }
        const path = sPathzzStore.itemzz.find(
            (item) => item.entityId === property.entity.id && item.moduleId === property.module.id,
        )
        sFlowPageStore.setPath(path)

        if (tab) {
            sFlowPageStore.setAction(tab.name, find(tab))
        } else {
            sFlowPageStore.setAction("")
        }
    }, [property.entity, property.module])

    function find(file: LB.File) {
        return sModuleActionzzStore.itemzz.find(
            (item) =>
                item.entityId === property.entity.id &&
                item.moduleId === property.module.id &&
                item.directoryId === property.module.directoryId &&
                item.name === file.name,
        )
    }

    function getCN(mad: LB.File, ma?: LB.ModuleAction) {
        let cn = "nav-link"
        if (tab) {
            if (mad.id === tab.id) {
                cn += " active"
                if (ma === undefined) {
                    cn += " bg-white text-secondary border-primary"
                }
                return cn
            }
        }

        if (ma === undefined) {
            cn += " text-secondary"
        }
        return cn
    }

    function makeAction() {
        showNameInput("please input the action name", "").then(function (result) {
            if (result.isConfirmed) {
                if (result.value) {
                    makeModuleActionAll(result.value)
                }
            }
        })
    }

    function makeButton(mad: LB.File, ma?: LB.ModuleAction) {
        if (tab === undefined) {
            return null
        }

        if (tab.id !== mad.id) {
            return null
        }

        if (ma) {
            return null
        }

        return (
            <span
                onClick={function () {
                    makeModuleActionAll(tab.name)
                }}
                className="badge bg-success rounded-pill"
            >
                +
            </span>
        )
    }

    function makeModuleActionAll(name: string) {
        makeModuleActionCRUD()
            .create(makeModuleAction(name, property.entity, property.module))
            .then(function (item) {
                sFlowPageStore.setAction(name, item)

                return makePathOf(
                    item,
                    property.entity,
                    property.module,
                    sPathzzStore.itemzz,
                    getHttpMethod(item.name),
                ).then(function (path) {
                    sFlowPageStore.setPath(path)
                    if (item.name.includes("One") === false) {
                        return
                    }

                    return makeParameterMapCRUD().create({
                        alias: "",
                        columnId: Constant.ColumnIdOfIdInParameterInPath,
                        pathId: path.id,
                        requestId: null,
                        responseId: null,
                    })
                })
            })
            .catch(useToastzzStore.getState().showError)
    }

    function makeTab(file: LB.File) {
        const ma = find(file)
        return (
            <li
                key={file.id}
                onClick={function () {
                    sFlowPageStore.setAction(file.name, ma)
                }}
                className="nav-item nav-item-fill"
            >
                <span className={getCN(file, ma)}>
                    {file.name} {makeButton(file, ma)}
                </span>
            </li>
        )
    }

    return (
        <div>
            <div className="d-flex">
                <h3>{Step}</h3>
            </div>

            <ul className={"nav nav-tabs"}>{tabzz.map(makeTab)}</ul>

            <ul className={"nav nav-tabs mt-3"}>
                {actionzz.map(function (item) {
                    return (
                        <li
                            key={"ma" + item.id}
                            className="nav-item nav-item-fill"
                            onClick={function () {
                                sFlowPageStore.setAction(item.name, item)
                            }}
                        >
                            <span
                                className={
                                    "nav-link " +
                                    (sFlowPageStore.action === item.name ? "active border-primary" : "text-primary")
                                }
                            >
                                {item.name}
                            </span>
                        </li>
                    )
                })}

                <li className="nav-item">
                    <button className="btn btn-outline-primary ms-3" type="button" onClick={makeAction}>
                        +
                    </button>
                </li>
            </ul>
        </div>
    )
}
