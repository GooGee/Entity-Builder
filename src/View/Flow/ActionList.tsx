import makeModuleAction from "@/Database/Factory/makeModuleAction"
import { makeModuleActionCRUD } from "@/Database/makeCRUD"
import useDirectoryzzStore from "@/Store/useDirectoryzzStore"
import useFlowPageStore, { StepEnum } from "@/Store/useFlowPageStore"
import useModuleActionzzStore from "@/Store/useModuleActionzzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import { useEffect } from "react"
import showNameInput from "../Dialog/showNameInput"
import usePathzzStore from "@/Store/usePathzzStore"
import { makePathMethod, makePathOf } from "@/Database/Factory/makePath"

const Step = StepEnum.Action

interface Property {
    entity: LB.Entity
    module: LB.Module
}

export default function ActionList(property: Property) {
    const sDirectoryzzStore = useDirectoryzzStore()
    const sFlowPageStore = useFlowPageStore()
    const sModuleActionzzStore = useModuleActionzzStore()

    const tabzz =
        sDirectoryzzStore.treeMap
            .get(property.module.directoryId)
            ?.childzz?.slice()
            .sort((aa, bb) => aa.name.localeCompare(bb.name)) ?? []
    const tab = tabzz.find((item) => sFlowPageStore.action === item.name)

    const xActionzz = sModuleActionzzStore.itemzz.filter(
        (item) =>
            item.directoryId === property.module.directoryId &&
            item.entityId === property.entity.id,
    )

    useEffect(() => {
        if (
            sFlowPageStore.path?.entityId === property.entity.id &&
            sFlowPageStore.path?.moduleId === property.module.id
        ) {
            return
        }
        sFlowPageStore.setPath(undefined)
        if (tab) {
            sFlowPageStore.setAction(tab.name, find(tab))
        } else {
            sFlowPageStore.setAction("")
        }
    }, [property.entity, property.module])

    function find(mad: LB.Directory) {
        return sModuleActionzzStore.itemzz.find(
            (item) =>
                item.entityId === property.entity.id &&
                item.moduleId === property.module.id &&
                item.directoryId === mad.id,
        )
    }

    function getCN(mad: LB.Directory, ma?: LB.ModuleAction) {
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
                    const md = sDirectoryzzStore.find(property.module.directoryId)
                    if (md) {
                        const folder = { ...md, name: result.value }
                        makeModuleActionAll(folder)
                    }
                }
            }
        })
    }

    function makeButton(mad: LB.Directory, ma?: LB.ModuleAction) {
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
                    makeModuleActionAll(tab)
                }}
                className="badge bg-success rounded-pill"
            >
                +
            </span>
        )
    }

    function makeModuleActionAll(tab: LB.Directory) {
        makeModuleActionCRUD()
            .create(makeModuleAction(tab, property.entity, property.module))
            .then(function (item) {
                sFlowPageStore.setAction(sFlowPageStore.action, item)
                return makePathOf(
                    item,
                    property.entity,
                    property.module,
                    usePathzzStore.getState().itemzz,
                ).then(function (path) {
                    sFlowPageStore.setPath(path)
                    return makePathMethod(path, item)
                })
            })
            .catch(useToastzzStore.getState().showError)
    }

    function makeTab(mad: LB.Directory) {
        const ma = find(mad)
        return (
            <li
                key={mad.id}
                onClick={function () {
                    sFlowPageStore.setAction(mad.name, ma)
                }}
                className="nav-item nav-item-fill"
            >
                <span className={getCN(mad, ma)}>
                    {mad.name} {makeButton(mad, ma)}
                </span>
            </li>
        )
    }

    return (
        <div>
            <div className="d-flex">
                <h3>{Step}</h3>

                <div>
                    <button
                        className="btn btn-outline-primary ms-3"
                        type="button"
                        onClick={makeAction}
                    >
                        +
                    </button>
                </div>
            </div>

            <ul className={"nav nav-tabs"}>
                {tabzz.map(makeTab)}

                {xActionzz.map(function (item) {
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
                                    (sFlowPageStore.action === item.name
                                        ? "active border-primary"
                                        : "text-primary")
                                }
                            >
                                {item.name}
                            </span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
