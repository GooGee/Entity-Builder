import { makePathFor } from "@/Database/Factory/makePath"
import { makePathCRUD, makeParameterMapCRUD } from "@/Database/makeCRUD"
import { getParameterInPath } from "@/Service/getParameter"
import useFilezzStore from "@/Store/useFilezzStore"
import useFlowPageStore, { StepEnum } from "@/Store/useFlowPageStore"
import usePathzzStore from "@/Store/usePathzzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import { useEffect } from "react"
import DeleteChangeButton from "../Button/DeleteChangeButton"
import FileButton from "../Button/FileButton"
import showInput from "../Dialog/showInput"
import PathDetail from "../Oapi/PathDetail"
import TabItemList from "../Part/TabItemList"

const Step = StepEnum.Path

interface Property {
    entity: LB.Entity
    module: LB.Module
}

export default function PathList(property: Property) {
    const sFilezzStore = useFilezzStore()
    const sFlowPageStore = useFlowPageStore()
    const sPathzzStore = usePathzzStore()
    const sToastzzStore = useToastzzStore()

    useEffect(() => {
        if (
            sFlowPageStore.path?.entityId === property.entity.id &&
            sFlowPageStore.path?.moduleId === property.module.id
        ) {
            return
        }

        const path = sPathzzStore.itemzz.find(
            (item) =>
                item.entityId === property.entity.id &&
                item.moduleId === property.module.id,
        )
        sFlowPageStore.setPath(path)
    }, [property.entity, property.module])

    const file = sFilezzStore.find(property.module.fileId)

    const routezz = sPathzzStore.itemzz.filter(
        (item) =>
            item.moduleId === property.module.id &&
            item.entityId === property.entity.id,
    )

    function makeView() {
        const path = sFlowPageStore.path
        if (path === undefined) {
            return null
        }

        return (
            <PathDetail entity={property.entity} item={path}>
                <DeleteChangeButton
                    name={path.name}
                    onChange={function () {
                        showInput("Please input the path", path.name)
                            .then((response) => {
                                if (response.isConfirmed) {
                                    return makePathCRUD()
                                        .update({
                                            ...path,
                                            name: response.value,
                                        })
                                        .then(sFlowPageStore.setPath)
                                }
                            })
                            .catch(sToastzzStore.showError)
                    }}
                    onDelete={function (isConfirmed) {
                        if (isConfirmed) {
                            makePathCRUD()
                                .delete(path.id)
                                .then(() => sFlowPageStore.setPath())
                                .catch(sToastzzStore.showError)
                        }
                    }}
                ></DeleteChangeButton>
            </PathDetail>
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
                tab={sFlowPageStore.path}
                tabzz={routezz}
                setTab={(item) => sFlowPageStore.setPath(item)}
            >
                <>
                    <li className="nav-item">
                        <button
                            className="btn btn-outline-primary ms-3"
                            type="button"
                            onClick={function () {
                                const path = makePathFor(
                                    property.entity,
                                    property.module,
                                    sPathzzStore.itemzz,
                                )
                                return makePathCRUD()
                                    .create(path)
                                    .then(function (item) {
                                        if (sFlowPageStore.path === undefined) {
                                            sFlowPageStore.setPath(item)
                                        }
                                        if (path.name.includes("/{id}")) {
                                            const column = getParameterInPath("id")
                                            if (column === undefined) {
                                                return
                                            }
                                            return makeParameterMapCRUD().create({
                                                alias: "",
                                                columnId: column.id,
                                                pathId: item.id,
                                                requestId: null,
                                                responseId: null,
                                            })
                                        }
                                    })
                                    .catch(sToastzzStore.showError)
                            }}
                        >
                            +
                        </button>
                    </li>

                    <li className="nav-item">
                        {file === undefined ? (
                            <span className="text-danger ms-3">
                                route file {property.module.fileId} not found
                            </span>
                        ) : (
                            <FileButton
                                action={""}
                                className="ms-3"
                                file={file}
                                fullName
                                entity={property.entity}
                                module={property.module}
                            ></FileButton>
                        )}
                    </li>
                </>
            </TabItemList>

            {sFlowPageStore.step === Step ? makeView() : null}
        </div>
    )
}
