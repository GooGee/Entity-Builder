import { makeColumnConstraintCRUD } from "@/Database/makeCRUD"
import useToastzzStore from "@/Store/useToastzzStore"

interface Property {
    item: LB.ColumnConstraint
}

export default function Constraint(property: Property) {
    const sToastzzStore = useToastzzStore()

    return (
        <tr>
            <td>
                <div className="btn-group">
                    <button
                        onClick={() => makeColumnConstraintCRUD().delete(property.item.id).catch(sToastzzStore.showError)}
                        className="btn btn-outline-danger"
                        type="button"
                    >
                        -
                    </button>
                    <button className="btn btn-outline-secondary" type="button">
                        {property.item.name}
                    </button>
                </div>
            </td>
            <td>
                <input
                    value={property.item.parameter}
                    onChange={(event) =>
                        makeColumnConstraintCRUD()
                            .update({
                                ...property.item,
                                parameter: event.target.value ?? "",
                            })
                            .catch(sToastzzStore.showError)
                    }
                    type="text"
                    className="form-control"
                />
            </td>
        </tr>
    )
}
