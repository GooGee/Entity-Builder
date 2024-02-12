import { makePathCRUD } from "@/Database/makeCRUD"
import useFlowPageStore from "@/Store/useFlowPageStore"
import useToastzzStore from "@/Store/useToastzzStore"
import DeleteChangeButton from "@/View/Button/DeleteChangeButton"
import showInput from "@/View/Dialog/showInput"
import PathDetail from "@/View/Oapi/PathDetail"
import PathList from "./PathList"

interface Property {
    entity: LB.Entity
    module: LB.Module
}

export default function PathView(property: Property) {
    const sFlowPageStore = useFlowPageStore()
    const sToastzzStore = useToastzzStore()

    function show(path: LB.Path) {
        return (
            <PathDetail entity={property.entity} item={path} module={property.module}>
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
            <PathList entity={property.entity} module={property.module}></PathList>

            {sFlowPageStore.path === undefined ? null : show(sFlowPageStore.path)}
        </div>
    )
}
