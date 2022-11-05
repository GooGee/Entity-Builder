import { makeColumnCRUD } from "@/Database/makeCRUD"
import showConfirm from "@/View/Dialog/showConfirm"
import showNameInput from "@/View/Dialog/showNameInput"
import useToastzzStore from "@/Store/useToastzzStore"
import ColumnDetail from "./ColumnDetail"
import { useState } from "react"

interface Property {
    item: LB.Column
    selectType(item: LB.Column): void
}

export default function Column(property: Property) {
    const sToastzzStore = useToastzzStore()

    const [item, setItem] = useState(property.item)

    function update(data: LB.Column) {
        setItem(data)
        makeColumnCRUD()
            .update(data)
            .then(setItem)
            .catch(sToastzzStore.showError)
    }

    return (
        <tr>
            <td>
                <div className="form-check form-switch inline">
                    <input
                        checked={item.inTable}
                        onChange={(event) =>
                            update({
                                ...item,
                                inTable: event.target.checked,
                            })
                        }
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id={"inTableSwitchCheck" + item.id}
                    />
                    <label
                        className="form-check-label"
                        htmlFor={"inTableSwitchCheck" + item.id}
                    ></label>
                </div>
                <div className="btn-group">
                    <button
                        onClick={() =>
                            showConfirm()
                                .then((response) => {
                                    if (response.isConfirmed) {
                                        return makeColumnCRUD().delete(item.id)
                                    }
                                })
                                .catch(sToastzzStore.showError)
                        }
                        className="btn btn-outline-primary danger"
                        type="button"
                    >
                        -
                    </button>
                    <button
                        onClick={() =>
                            showNameInput("Please input the Column name", item.name)
                                .then((response) => {
                                    if (response.isConfirmed) {
                                        return update({
                                            ...item,
                                            name: response.value,
                                        })
                                    }
                                })
                                .catch(sToastzzStore.showError)
                        }
                        className="btn btn-outline-primary"
                        type="button"
                    >
                        {item.name}
                    </button>
                </div>
            </td>
            <td>
                <button
                    onClick={() => property.selectType(item)}
                    className="btn btn-outline-primary"
                    type="button"
                >
                    {item.type}
                </button>
            </td>
            <td>
                <input
                    value={item.default}
                    onChange={(event) =>
                        update({
                            ...item,
                            default: event.target.value,
                        })
                    }
                    type="text"
                    className="form-control"
                />
            </td>
            <td>
                <ColumnDetail item={item} update={update}></ColumnDetail>
            </td>
        </tr>
    )
}
