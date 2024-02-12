import { makePathCRUD } from "@/Database/makeCRUD"
import useFilezzStore from "@/Store/useFilezzStore"
import useFlowPageStore from "@/Store/useFlowPageStore"
import useToastzzStore from "@/Store/useToastzzStore"
import DeleteChangeButton from "@/View/Button/DeleteChangeButton"
import FileButton from "@/View/Button/FileButton"
import showInput from "@/View/Dialog/showInput"
import PathDetail from "@/View/Oapi/PathDetail"

interface Property {
    entity: LB.Entity
    module: LB.Module
    path: LB.Path
}

export default function PathView(property: Property) {
    const sFlowPageStore = useFlowPageStore()
    const sToastzzStore = useToastzzStore()

    const file = useFilezzStore.getState().find(property.module.fileId)

    return (
        <PathDetail
            entity={property.entity}
            item={property.path}
            module={property.module}
        >
            <div>
                <DeleteChangeButton
                    name={property.path.name}
                    onChange={function () {
                        showInput("Please input the path", property.path.name)
                            .then((response) => {
                                if (response.isConfirmed) {
                                    return makePathCRUD()
                                        .update({
                                            ...property.path,
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
                                .delete(property.path.id)
                                .then(() => sFlowPageStore.setPath())
                                .catch(sToastzzStore.showError)
                        }
                    }}
                ></DeleteChangeButton>

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
        </PathDetail>
    )
}
