import { makeWuParameterCRUD } from "@/Database/makeCRUD"
import useToastzzStore from "@/Store/useToastzzStore"
import showConfirm from "../Dialog/showConfirm"
import showNameInput from "../Dialog/showNameInput"

interface Property {
    item: LB.WuParameter
}

export default function WuParameter(property: Property) {
    const sToastzzStore = useToastzzStore()

    function update(data: LB.WuParameter) {
        makeWuParameterCRUD().update(data).catch(sToastzzStore.showError)
    }

    return (
        <tr>
            <td>
                <div className="btn-group">
                    <span
                        onClick={() =>
                            showConfirm()
                                .then((response) => {
                                    if (response.isConfirmed) {
                                        return makeWuParameterCRUD().delete(property.item.id)
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
                            showNameInput("Please input the Parameter name", property.item.name)
                                .then((response) => {
                                    if (response.isConfirmed) {
                                        return update({
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
                <div className="form-check form-switch">
                    <input
                        checked={property.item.isWu}
                        onChange={(event) =>
                            update({
                                ...property.item,
                                isWu: event.target.checked,
                            })
                        }
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id={"isWuSwitchCheck" + property.item.id}
                    />
                    <label className="form-check-label" htmlFor={"isWuSwitchCheck" + property.item.id}></label>
                </div>
            </td>
            <td>
                <input
                    onChange={(event) =>
                        update({
                            ...property.item,
                            description: event.target.value,
                        })
                    }
                    type="text"
                    placeholder="description"
                    className="form-control"
                />
            </td>
        </tr>
    )
}
