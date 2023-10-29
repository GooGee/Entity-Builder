import { makePathMethodCRUD } from "@/Database/makeCRUD"
import useToastzzStore from "@/Store/useToastzzStore"
import SelectButton from "../Button/SelectButton"
import PathMiddlewareList from "./PathMiddlewareList"

interface Property {
    itemzz: LB.PathMethod[]
    mazz: LB.IdNameItem[]
    method: string
    middlewarezz: string[]
    path: LB.Path
    refresh(): void
}

export default function PathMethod(property: Property) {
    const sToastzzStore = useToastzzStore()

    function update(data: LB.PathMethod) {
        makePathMethodCRUD()
            .update(data)
            .then(() => property.refresh())
            .catch(sToastzzStore.showError)
    }

    const found = property.itemzz.find((item) => item.method === property.method)
    if (found === undefined) {
        return (
            <tr>
                <td>{property.method}</td>
                <td>
                    <SelectButton
                        className="wa inline"
                        itemzz={property.mazz}
                        value={0}
                        change={function (id) {
                            makePathMethodCRUD()
                                .create({
                                    pathId: property.path.id,
                                    moduleActionId: id,
                                    method: property.method,
                                    middlewarezz: [],
                                })
                                .then(() => property.refresh())
                                .catch(sToastzzStore.showError)
                        }}
                    ></SelectButton>
                </td>
                <td></td>
            </tr>
        )
    }

    const ma = property.mazz.find((item) => item.id === found.moduleActionId)
    if (ma === undefined) {
        return (
            <tr>
                <td colSpan={3}>
                    <span className="text-danger">
                        ModuleAction {found.moduleActionId} not found
                    </span>
                </td>
            </tr>
        )
    }
    return (
        <tr>
            <td>{property.method}</td>
            <td>
                <button
                    className="btn btn-outline-danger me-1"
                    type="button"
                    onClick={function () {
                        makePathMethodCRUD()
                            .delete(found.id)
                            .then(() => property.refresh())
                            .catch(sToastzzStore.showError)
                    }}
                >
                    -
                </button>
                <SelectButton
                    className="wa inline"
                    itemzz={property.mazz}
                    value={ma.id}
                    change={function (id) {
                        update({
                            ...found,
                            moduleActionId: id,
                        })
                    }}
                ></SelectButton>
            </td>
            <td>
                <PathMiddlewareList
                    item={found}
                    middlewarezz={property.middlewarezz}
                    path={property.path}
                    update={update}
                ></PathMiddlewareList>
            </td>
        </tr>
    )
}
