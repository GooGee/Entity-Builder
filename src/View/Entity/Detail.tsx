import { makeEntityCRUD } from "@/Database/makeCRUD"
import useToastzzStore from "@/Store/useToastzzStore"
import ColorButtonGroup from "../Button/ColorButtonGroup"

interface Property {
    item: LB.Entity
}

export default function Detail(property: Property) {
    const sToastzzStore = useToastzzStore()

    return (
        <table className="table td0-tar">
            <caption>
                <h3 className="inline me-3">Detail</h3>
            </caption>

            <tbody>
                <tr>
                    <td>color</td>
                    <td>
                        <ColorButtonGroup
                            color={property.item.color}
                            setColor={(color) =>
                                makeEntityCRUD()
                                    .update({
                                        ...property.item,
                                        color,
                                    })
                                    .catch(sToastzzStore.showError)
                            }
                        ></ColorButtonGroup>
                    </td>
                </tr>
                <tr>
                    <td>isTable</td>
                    <td>
                        <div className="form-check form-switch">
                            <input
                                checked={property.item.isTable}
                                onChange={(event) =>
                                    makeEntityCRUD()
                                        .update({
                                            ...property.item,
                                            isTable: event.target.checked,
                                        })
                                        .catch(sToastzzStore.showError)
                                }
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id={"isTableSwitchCheck" + property.item.id}
                            />
                            <label
                                className="form-check-label"
                                htmlFor={"isTableSwitchCheck" + property.item.id}
                            ></label>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
