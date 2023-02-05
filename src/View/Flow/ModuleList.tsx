import makeModule from "@/Database/Factory/makeModule"
import { makeModuleCRUD } from "@/Database/makeCRUD"
import useFlowPageStore, { StepEnum } from "@/Store/useFlowPageStore"
import useModulezzStore from "@/Store/useModulezzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import { useEffect } from "react"
import DeleteChangeButton from "../Button/DeleteChangeButton"
import showNameInput from "../Dialog/showNameInput"
import TabItemList from "../Part/TabItemList"
import ModuleDetail from "./ModuleDetail"

const Step = StepEnum.Module

interface Property {
    entity: LB.Entity // required for parsing directory name
}

export default function ModuleList(property: Property) {
    const sFlowPageStore = useFlowPageStore()
    const sModulezzStore = useModulezzStore()
    const sToastzzStore = useToastzzStore()

    useEffect(() => {
        if (sFlowPageStore.module === undefined) {
            if (sModulezzStore.itemzz.length) {
                sFlowPageStore.setModule(sModulezzStore.itemzz[0])
            }
        }
    }, [property.entity])

    function makeView() {
        const module = sFlowPageStore.module
        if (module === undefined) {
            return null
        }

        return (
            <ModuleDetail item={module} entity={property.entity}>
                <DeleteChangeButton
                    name={module.name}
                    onChange={function () {
                        showNameInput("Please input the Module name", module.name)
                            .then(function (result) {
                                if (result.isConfirmed) {
                                    return makeModuleCRUD()
                                        .update({
                                            ...module,
                                            name: result.value,
                                        })
                                        .then((item) => sFlowPageStore.setModule(item))
                                }
                            })
                            .catch(sToastzzStore.showError)
                    }}
                    onDelete={function (isConfirmed) {
                        if (isConfirmed) {
                            makeModuleCRUD().delete(module.id)
                            sFlowPageStore.setModule(undefined)
                        }
                    }}
                ></DeleteChangeButton>
            </ModuleDetail>
        )
    }

    return (
        <div>
            <h3
                className="pointer hover-blue c-secondary"
                onClick={() => sFlowPageStore.setStep(Step)}
            >
                {Step}
            </h3>
            <TabItemList
                empty={sFlowPageStore.step !== Step}
                tab={sFlowPageStore.module}
                tabzz={sModulezzStore.itemzz}
                setTab={(item) => sFlowPageStore.setModule(item)}
            >
                <li className="nav-item">
                    <button
                        className="btn btn-outline-primary ms-3"
                        type="button"
                        onClick={function () {
                            showNameInput("Please input the Module name", "")
                                .then(function (result) {
                                    if (result.isConfirmed) {
                                        return makeModuleCRUD()
                                            .create(makeModule(result.value))
                                            .then((item) =>
                                                sFlowPageStore.setModule(item),
                                            )
                                    }
                                })
                                .catch(sToastzzStore.showError)
                        }}
                    >
                        +
                    </button>
                </li>
            </TabItemList>

            {sFlowPageStore.step === Step ? makeView() : null}
        </div>
    )
}
