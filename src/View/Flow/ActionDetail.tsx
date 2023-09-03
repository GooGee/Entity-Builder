import { makeModuleActionCRUD } from "@/Database/makeCRUD"
import useToastzzStore from "@/Store/useToastzzStore"
import { ReactElement, useEffect, useState } from "react"
import showNameInput from "../Dialog/showNameInput"
import ServerList from "../Oapi/ServerList"

interface Property {
    action: string
    children?: ReactElement
    entity: LB.Entity
    ma: LB.ModuleAction
}

export default function ActionDetail(property: Property) {
    const sToastzzStore = useToastzzStore()

    const [item, setItem] = useState(property.ma)

    useEffect(() => {
        setItem(property.ma)
    }, [property.ma])

    function update(data: LB.ModuleAction) {
        setItem(data)
        makeModuleActionCRUD().update(data).then(setItem).catch(sToastzzStore.showError)
    }

    return (
        <table className="table td0-tar">
            <caption>{property.children}</caption>
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
                    <td>inOapi</td>
                    <td>
                        <div className="form-check form-switch inline">
                            <input
                                checked={item.inOapi}
                                onChange={(event) =>
                                    update({
                                        ...item,
                                        inOapi: event.target.checked,
                                    })
                                }
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id={"inOapiSwitchCheck" + item.id}
                            />
                            <label
                                className="form-check-label"
                                htmlFor={"inOapiSwitchCheck" + item.id}
                            ></label>
                        </div>

                        <span>if true, it will be included in OpenApi document</span>
                    </td>
                </tr>
                <tr>
                    <td>inRoute</td>
                    <td>
                        <div className="form-check form-switch inline">
                            <input
                                checked={item.inRoute}
                                onChange={(event) =>
                                    update({
                                        ...item,
                                        inRoute: event.target.checked,
                                    })
                                }
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id={"inRouteSwitchCheck" + item.id}
                            />
                            <label
                                className="form-check-label"
                                htmlFor={"inRouteSwitchCheck" + item.id}
                            ></label>
                        </div>

                        <span>if true, it will be included in route file</span>
                    </td>
                </tr>
                <tr>
                    <td>server</td>
                    <td>
                        <ServerList
                            requestId={property.ma.requestId}
                            pathId={null}
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
                    <td>routeName</td>
                    <td>
                        <input
                            value={item.routeName}
                            onChange={(event) =>
                                update({
                                    ...item,
                                    routeName: event.target.value,
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
