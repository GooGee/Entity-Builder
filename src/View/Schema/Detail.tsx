import { makeSchemaCRUD } from "@/Database/makeCRUD"
import useToastzzStore from "@/Store/useToastzzStore"
import ColorButtonGroup from "../Button/ColorButtonGroup"

interface Property {
    schema: LB.Schema
}

export default function Detail(property: Property) {
    const sToastzzStore = useToastzzStore()

    return (
        <table className="table table-text-right">
            <caption>
                <h3 className="inline me-3">Detail</h3>
            </caption>

            <tbody>
                <tr>
                    <td>color</td>
                    <td>
                        <ColorButtonGroup
                            color={property.schema.color}
                            setColor={(color) =>
                                makeSchemaCRUD()
                                    .update({
                                        ...property.schema,
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
