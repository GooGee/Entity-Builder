import { makePathCRUD } from "@/Database/makeCRUD"
import usePathPageStore from "@/Store/usePathPageStore"
import useToastzzStore from "@/Store/useToastzzStore"
import ParameterList from "./ParameterList"
import ServerList from "./ServerList"
import ColorButtonGroup from "../Button/ColorButtonGroup"
import PathMiddlewareList from "./PathMiddlewareList"
import getCollectionItemzz from "@/Service/getCollectionItemzz"
import SelectStringButton from "../Button/SelectStringButton"
import { HttpMethodzz } from "@/Model/Oapi"
import { ReactNode } from "react"

interface Property {
    children: ReactNode
    entity: LB.Entity
    item: LB.Path
    ma: LB.ModuleAction
    module: LB.Module
    onDelete?(): void
}

export default function PathDetail(property: Property) {
    const sPathPageStore = usePathPageStore()

    const middlewarezz = getCollectionItemzz("Middleware").map((item) => item.name)

    function update(item: LB.Path) {
        sPathPageStore.setItem(item)
        makePathCRUD()
            .update(item)
            .then((response) => sPathPageStore.setItem(response))
            .catch(useToastzzStore.getState().showError)
    }

    return (
        <table className="table td0-tar">
            <caption>{property.children}</caption>
            <tbody>
                <tr>
                    <td>color</td>
                    <td>
                        <ColorButtonGroup
                            color={property.item.color}
                            setColor={(color) =>
                                update({
                                    ...property.item,
                                    color,
                                })
                            }
                        ></ColorButtonGroup>
                    </td>
                </tr>
                <tr>
                    <td className="w111">parameter</td>
                    <td>
                        <ParameterList pathId={property.item.id}></ParameterList>
                    </td>
                </tr>
                <tr>
                    <td>method</td>
                    <td>
                        <SelectStringButton
                            className="wa"
                            itemzz={HttpMethodzz}
                            value={property.item.method}
                            change={(method) =>
                                update({
                                    ...property.item,
                                    method,
                                })
                            }
                        ></SelectStringButton>
                    </td>
                </tr>
                <tr>
                    <td>middlewarezz</td>
                    <td>
                        <PathMiddlewareList
                            item={property.item}
                            middlewarezz={middlewarezz}
                            path={property.item}
                            update={update}
                        ></PathMiddlewareList>
                    </td>
                </tr>
                <tr>
                    <td>server</td>
                    <td>
                        <ServerList requestId={null} pathId={property.item.id}></ServerList>
                    </td>
                </tr>
                <tr>
                    <td>summary</td>
                    <td>
                        <input
                            value={property.item.summary}
                            onChange={(event) =>
                                update({
                                    ...property.item,
                                    summary: event.target.value,
                                })
                            }
                            className="form-control"
                            type="text"
                        />
                    </td>
                </tr>
                <tr>
                    <td>description</td>
                    <td>
                        <textarea
                            className="form-control"
                            value={property.item.description}
                            onChange={(event) =>
                                update({
                                    ...property.item,
                                    description: event.target.value,
                                })
                            }
                        ></textarea>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
