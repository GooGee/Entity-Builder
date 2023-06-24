import { makePathFor } from "@/Database/Factory/makePath"
import { makePathCRUD, makeParameterMapCRUD } from "@/Database/makeCRUD"
import { getParameterInPath } from "@/Service/getParameter"
import useFilezzStore from "@/Store/useFilezzStore"
import useFlowPageStore, { StepEnum } from "@/Store/useFlowPageStore"
import usePathzzStore from "@/Store/usePathzzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import { useEffect } from "react"
import FileButton from "../Button/FileButton"
import ListGroup from "../Part/ListGroup"

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

    return (
        <div>
            <div className="d-flex">
                <h3>{Step}</h3>

                <div>
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
                </div>

                <div>
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
                </div>
            </div>

            <ListGroup
                item={sFlowPageStore.path}
                itemzz={routezz}
                select={(item: LB.Path) => sFlowPageStore.setPath(item)}
            ></ListGroup>
        </div>
    )
}
