import makeModuleAction from "@/Database/Factory/makeModuleAction"
import { makeModuleActionCRUD, makePathMethodCRUD } from "@/Database/makeCRUD"
import makeNotFoundText from "@/Factory/makeNotFoundText"
import getCollectionItemzz from "@/Service/getCollectionItemzz"
import useDirectoryzzStore from "@/Store/useDirectoryzzStore"
import useFlowPageStore, { StepEnum } from "@/Store/useFlowPageStore"
import useModuleActionzzStore from "@/Store/useModuleActionzzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import { useEffect } from "react"
import showConfirm from "../Dialog/showConfirm"
import ActionDetail from "./ActionDetail"

const Step = StepEnum.Action

interface Property {
    entity: LB.Entity
    module: LB.Module
}

export default function ActionList(property: Property) {
    const sDirectoryzzStore = useDirectoryzzStore()
    const sFlowPageStore = useFlowPageStore()
    const sModuleActionzzStore = useModuleActionzzStore()
    const sToastzzStore = useToastzzStore()

    const tabzz = getCollectionItemzz("ModuleAction")
    const tab = tabzz.find((item) => sFlowPageStore.action === item.name)

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

    function find(ci: LB.CollectionItem) {
        return sModuleActionzzStore.itemzz.find(
            (item) =>
                item.entityId === property.entity.id &&
                item.moduleId === property.module.id &&
                item.collectionItemId === ci.id,
        )
    }

    function getCN(ci: LB.CollectionItem, ma?: LB.ModuleAction) {
        let cn = "nav-link"
        if (tab) {
            if (ci.id === tab.id) {
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

    function makeButton(ci: LB.CollectionItem, ma?: LB.ModuleAction) {
        if (tab === undefined) {
            return null
        }

        if (tab.id !== ci.id) {
            return null
        }

        if (ma) {
            return null
        }

        return (
            <span
                onClick={function () {
                    const found = sDirectoryzzStore.itemzz.find(
                        (item) =>
                            item.parentId === property.module.directoryId &&
                            item.name === tab.name,
                    )
                    if (found === undefined) {
                        sToastzzStore.showDanger(
                            `Directory ${tab.name} not found in ${property.module.name}`,
                        )
                        return
                    }

                    makeModuleActionCRUD()
                        .create(
                            makeModuleAction(
                                found.id,
                                property.module.testDirectoryId,
                                property.entity,
                                property.module,
                                tab,
                            ),
                        )
                        .then(function (item) {
                            sFlowPageStore.setAction(sFlowPageStore.action, item)
                            if (sFlowPageStore.path) {
                                return makePathMethodCRUD().create({
                                    pathId: sFlowPageStore.path.id,
                                    moduleActionId: item.id,
                                    method: tab.tag,
                                    middlewarezz: [],
                                })
                            }
                        })
                        .catch(sToastzzStore.showError)
                }}
                className="badge bg-success rounded-pill"
            >
                +
            </span>
        )
    }

    function makeTab(ci: LB.CollectionItem) {
        const ma = find(ci)
        return (
            <li
                key={ci.id}
                onClick={function () {
                    sFlowPageStore.setAction(ci.name, ma)
                }}
                className="nav-item nav-item-fill"
            >
                <span className={getCN(ci, ma)}>
                    {ci.name} {makeButton(ci, ma)}
                </span>
            </li>
        )
    }

    function makeView() {
        const ma = sFlowPageStore.ma
        if (ma) {
            if (tab === undefined) {
                return (
                    <div>{makeNotFoundText("ModuleAction", sFlowPageStore.action)}</div>
                )
            }
            return (
                <ActionDetail action={tab.name} entity={property.entity} ma={ma}>
                    <button
                        onClick={() => {
                            showConfirm()
                                .then((response) => {
                                    if (response.isConfirmed) {
                                        return makeModuleActionCRUD()
                                            .delete(ma.id)
                                            .then(() => sFlowPageStore.setAction(""))
                                    }
                                })
                                .catch(sToastzzStore.showError)
                        }}
                        className="btn btn-outline-danger"
                        type="button"
                    >
                        - {tab.name}
                    </button>
                </ActionDetail>
            )
        }

        return null
    }

    return (
        <div>
            <h3
                className="pointer hover-blue c-secondary"
                onClick={() => sFlowPageStore.setStep(Step)}
            >
                {Step}
            </h3>

            <ul className={"nav nav-tabs"}>{tabzz.map(makeTab)}</ul>

            {sFlowPageStore.step === Step ? makeView() : null}
        </div>
    )
}
