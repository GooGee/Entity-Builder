import { makeColumnCRUD } from "@/Database/makeCRUD"
import { makeNameMap } from "@/Factory/makeMap"
import getCollectionItemzz from "@/Service/getCollectionItemzz"
import useToastzzStore from "@/Store/useToastzzStore"
import { useState } from "react"
import showSelect from "../Dialog/showSelect"

interface Property {
    item: LB.Column
}

export default function CastField(property: Property) {
    const sToastzzStore = useToastzzStore()

    const [item, setItem] = useState(property.item)

    function update(data: LB.Column) {
        setItem(data)
        return makeColumnCRUD()
            .update(data)
            .then(setItem)
            .catch(sToastzzStore.showError)
    }

    return (
        <tr>
            <td>{item.name}</td>
            <td>
                <div className="form-check form-switch">
                    <input
                        checked={item.fillable}
                        onChange={(event) =>
                            update({
                                ...item,
                                fillable: event.target.checked,
                            })
                        }
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id={"fillableSwitchCheck" + item.id}
                    />
                    <label
                        className="form-check-label"
                        htmlFor={"fillableSwitchCheck" + item.id}
                    ></label>
                </div>
            </td>
            <td>
                <div className="form-check form-switch inline wa ms-3">
                    <input
                        checked={property.item.wo}
                        onChange={(event) =>
                            update({
                                ...property.item,
                                wo: event.target.checked,
                            })
                        }
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id={"woSwitchCheck" + property.item.id}
                    />
                    <label
                        className="form-check-label"
                        htmlFor={"woSwitchCheck" + property.item.id}
                    ></label>
                </div>
            </td>
            <td>{item.type}</td>
            <td>
                <div role="group" className="input-group">
                    <div className="input-group-prepend">
                        <button
                            onClick={function () {
                                const castzz = getCollectionItemzz("ModelFieldTypeCast")

                                showSelect(
                                    "Please select one item",
                                    item.cast,
                                    makeNameMap(castzz),
                                ).then((response) => {
                                    if (response.isConfirmed) {
                                        if (response.value) {
                                            return update({
                                                ...item,
                                                cast: response.value,
                                            })
                                        }
                                    }
                                })
                            }}
                            type="button"
                            className="btn btn-outline-primary"
                        >
                            +
                        </button>
                    </div>
                    <input
                        value={item.cast}
                        onChange={(event) =>
                            update({
                                ...item,
                                cast: event.target.value,
                            })
                        }
                        type="text"
                        className="form-control"
                    />
                </div>
            </td>
        </tr>
    )
}
