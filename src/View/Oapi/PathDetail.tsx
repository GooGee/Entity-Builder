import { makePathCRUD } from "@/Database/makeCRUD"
import usePathPageStore from "@/Store/usePathPageStore"
import useToastzzStore from "@/Store/useToastzzStore"
import { ReactElement } from "react"
import ColorButtonGroup from "../Button/ColorButtonGroup"
import DeleteChangeButton from "../Button/DeleteChangeButton"
import showInput from "../Dialog/showInput"
import ParameterList from "./ParameterList"
import PathMethodList from "./PathMethodList"
import ServerList from "./ServerList"

interface Property {
    children?: ReactElement
    item: LB.Path
    schema: LB.Schema
    onDelete(): void
}

export default function PathDetail(property: Property) {
    const sPathPageStore = usePathPageStore()
    const sToastzzStore = useToastzzStore()

    function update(item: LB.Path) {
        sPathPageStore.setItem(item)
        makePathCRUD()
            .update(item)
            .then((response) => sPathPageStore.setItem(response))
            .catch(sToastzzStore.showError)
    }

    return (
        <table className="table table-text-right">
            {property.children === undefined ? null : (
                <caption>{property.children}</caption>
            )}
            <tbody>
                <tr>
                    <td>name</td>
                    <td colSpan={2}>
                        <DeleteChangeButton
                            name={property.item.name}
                            onChange={function () {
                                showInput("Please input the path", property.item.name)
                                    .then((response) => {
                                        if (response.isConfirmed) {
                                            return update({
                                                ...property.item,
                                                name: response.value,
                                            })
                                        }
                                    })
                                    .catch(sToastzzStore.showError)
                            }}
                            onDelete={function (isConfirmed) {
                                if (isConfirmed) {
                                    makePathCRUD()
                                        .delete(property.item.id)
                                        .then(property.onDelete)
                                        .catch(sToastzzStore.showError)
                                }
                            }}
                        ></DeleteChangeButton>
                    </td>
                </tr>
                <tr>
                    <td>color</td>
                    <td colSpan={2}>
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
                    <td className="w222">schema</td>
                    <td>{property.schema.name}</td>
                    <td></td>
                </tr>
                <tr>
                    <td>parameter</td>
                    <td>
                        <ParameterList
                            inPath={true}
                            inResponse={false}
                            targetId={property.item.id}
                        ></ParameterList>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td>server</td>
                    <td colSpan={2}>
                        <ServerList
                            forPath={true}
                            targetId={property.item.id}
                        ></ServerList>
                    </td>
                </tr>
                <tr>
                    <td>summary</td>
                    <td colSpan={2}>
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
                    <td colSpan={2}>
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
                <PathMethodList item={property.item}></PathMethodList>
            </tbody>
        </table>
    )
}
