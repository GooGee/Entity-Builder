import { makeWuParameterCRUD } from "@/Database/makeCRUD"
import useToastzzStore from "@/Store/useToastzzStore"
import showConfirm from "../Dialog/showConfirm"
import showNameInput from "../Dialog/showNameInput"

interface Property {
    item: LB.WuParameter
}

export default function WuParameter(property: Property) {
    const sToastzzStore = useToastzzStore()

    return (
        <tr>
            <td>
                <div className="btn-group">
                    <span
                        onClick={() =>
                            showConfirm()
                                .then((response) => {
                                    if (response.isConfirmed) {
                                        return makeWuParameterCRUD().delete(
                                            property.item.id,
                                        )
                                    }
                                })
                                .catch(sToastzzStore.showError)
                        }
                        className="btn btn-outline-primary danger"
                    >
                        -
                    </span>
                    <span
                        onClick={() =>
                            showNameInput(
                                "Please input the Parameter name",
                                property.item.name,
                            )
                                .then((response) => {
                                    if (response.isConfirmed) {
                                        return makeWuParameterCRUD().update({
                                            ...property.item,
                                            name: response.value,
                                        })
                                    }
                                })
                                .catch(sToastzzStore.showError)
                        }
                        className="btn btn-outline-primary"
                    >
                        {property.item.name}
                    </span>
                </div>
            </td>
            <td>
                <input
                    onChange={(event) =>
                        makeWuParameterCRUD()
                            .update({
                                ...property.item,
                                description: event.target.value,
                            })
                            .catch(sToastzzStore.showError)
                    }
                    type="text"
                    placeholder="description"
                    className="form-control"
                />
            </td>
        </tr>
    )
}
