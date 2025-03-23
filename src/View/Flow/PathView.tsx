import { makeParameterMapCRUD, makePathCRUD } from "@/Database/makeCRUD"
import useFlowPageStore from "@/Store/useFlowPageStore"
import useToastzzStore from "@/Store/useToastzzStore"
import DeleteChangeButton from "@/View/Button/DeleteChangeButton"
import FileButton from "@/View/Button/FileButton"
import showInput from "@/View/Dialog/showInput"
import PathDetail from "@/View/Oapi/PathDetail"
import PathList from "./PathList"
import usePathzzStore from "@/Store/usePathzzStore"
import { makePathOf, getHttpMethod } from "@/Database/Factory/makePath"
import Constant from "@/Model/Constant"
import useFilezzStore from "@/Store/useFilezzStore"

interface Property {
    entity: LB.Entity
    ma: LB.ModuleAction
    module: LB.Module
}

export default function PathView(property: Property) {
    const sFlowPageStore = useFlowPageStore()
    const susePathzzStore = usePathzzStore()
    const sToastzzStore = useToastzzStore()

    const path = susePathzzStore.itemzz.find(function (item) {
        return (
            item.entityId === property.entity.id &&
            item.moduleId === property.module.id &&
            item.moduleActionId === property.ma.id
        )
    })

    if (path == null) {
        return (
            <div>
                <button
                    className="btn btn-outline-primary"
                    onClick={function () {
                        makePathOf(
                            property.ma,
                            property.entity,
                            property.module,
                            susePathzzStore.itemzz,
                            getHttpMethod(property.ma.name),
                        ).then(function (path) {
                            sFlowPageStore.setPath(path)
                            if (property.ma.name.includes("One") === false) {
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
                    }}
                >
                    +
                </button>
            </div>
        )
    }

    return (
        <PathDetail entity={property.entity} item={path} ma={property.ma} module={property.module}>
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
