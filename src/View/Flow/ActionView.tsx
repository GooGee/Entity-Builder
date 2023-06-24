import { makeModuleActionCRUD } from "@/Database/makeCRUD"
import ActionDetail from "./ActionDetail"
import useToastzzStore from "@/Store/useToastzzStore"
import useFlowPageStore from "@/Store/useFlowPageStore"
import DeleteChangeButton from "../Button/DeleteChangeButton"
import showNameInput from "../Dialog/showNameInput"

interface Property {
    entity: LB.Entity
    ma: LB.ModuleAction
    module: LB.Module
}

export default function ActionView(property: Property) {
    const sFlowPageStore = useFlowPageStore()
    const sToastzzStore = useToastzzStore()

    return (
        <ActionDetail
            action={property.ma.name}
            entity={property.entity}
            ma={property.ma}
        >
            <DeleteChangeButton
                name={property.ma.name}
                onChange={function () {
                    showNameInput("Please input the path", property.ma.name)
                        .then((response) => {
                            if (response.isConfirmed) {
                                return makeModuleActionCRUD()
                                    .update({
                                        ...property.ma,
                                        name: response.value,
                                    })
                                    .then((item) =>
                                        sFlowPageStore.setAction(item.name, item),
                                    )
                            }
                        })
                        .catch(sToastzzStore.showError)
                }}
                onDelete={function (isConfirmed) {
                    if (isConfirmed) {
                        makeModuleActionCRUD()
                            .delete(property.ma.id)
                            .then(() => sFlowPageStore.setAction(""))
                            .catch(sToastzzStore.showError)
                    }
                }}
            ></DeleteChangeButton>
        </ActionDetail>
    )
}
