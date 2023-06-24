import { makePathCRUD } from "@/Database/makeCRUD"
import useFlowPageStore from "@/Store/useFlowPageStore"
import useToastzzStore from "@/Store/useToastzzStore"
import DeleteChangeButton from "@/View/Button/DeleteChangeButton"
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

    return (
        <PathDetail
            entity={property.entity}
            item={property.path}
            module={property.module}
        >
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
        </PathDetail>
    )
}
