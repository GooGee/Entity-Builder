import { makeModuleActionCRUD } from "@/Database/makeCRUD"
import useToastzzStore from "@/Store/useToastzzStore"
import { useEffect, useState } from "react"
import showNameInput from "../Dialog/showNameInput"
import ServerList from "../Oapi/ServerList"

interface Property {
    action: string
    item: LB.ModuleAction
    schema: LB.Schema
}

export default function Detail(property: Property) {
    const sToastzzStore = useToastzzStore()

    const [item, setItem] = useState(property.item)

    useEffect(() => {
        setItem(property.item)
    }, [property.item])

    function update(data: LB.ModuleAction) {
        setItem(data)
        makeModuleActionCRUD().update(data).then(setItem).catch(sToastzzStore.showError)
    }

    return (
        <table className="table table-text-right">
            <tbody>
                <tr>
                    <td>deprecated</td>
                    <td>
                        <div className="form-check form-switch">
                            <input
                                checked={item.deprecated}
                                onChange={(event) =>
                                    update({
                                        ...item,
                                        deprecated: event.target.checked,
                                    })
                                }
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id={"deprecatedSwitchCheck" + item.id}
                            />
                            <label
                                className="form-check-label"
                                htmlFor={"deprecatedSwitchCheck" + item.id}
                            ></label>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>server</td>
                    <td>
                        <ServerList
                            forPath={false}
                            targetId={property.item.id}
                        ></ServerList>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td>summary</td>
                    <td>
                        <input
                            value={item.summary}
                            onChange={(event) =>
                                update({
                                    ...item,
                                    summary: event.target.value,
                                })
                            }
                            type="text"
                            className="form-control"
                        />
                    </td>
                </tr>
                <tr>
                    <td>operationId</td>
                    <td>
                        <button
                            className="btn btn-outline-primary"
                            type="button"
                            onClick={function () {
                                showNameInput(
                                    "Please input an unique operationId",
                                    item.operationId,
                                )
                                    .then((response) => {
                                        if (response.isConfirmed) {
                                            return makeModuleActionCRUD()
                                                .update({
                                                    ...item,
                                                    operationId: response.value,
                                                })
                                                .then(setItem)
                                        }
                                    })
                                    .catch(sToastzzStore.showError)
                            }}
                        >
                            {item.operationId}
                        </button>
                    </td>
                </tr>
                <tr>
                    <td>description</td>
                    <td>
                        <textarea
                            value={item.description}
                            onChange={(event) =>
                                update({
                                    ...item,
                                    description: event.target.value,
                                })
                            }
                            className="form-control"
                        ></textarea>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
