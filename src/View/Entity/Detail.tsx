import { makeEntityCRUD } from "@/Database/makeCRUD"
import useToastzzStore from "@/Store/useToastzzStore"
import ColorButtonGroup from "../Button/ColorButtonGroup"

interface Property {
    entity: LB.Entity
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
                            color={property.entity.color}
                            setColor={(color) =>
                                makeEntityCRUD()
                                    .update({
                                        ...property.entity,
                                        color,
                                    })
                                    .catch(sToastzzStore.showError)
                            }
                        ></ColorButtonGroup>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
