import { makeColumnCRUD } from "@/Database/makeCRUD"
import getCollectionItemzz from "@/Service/getCollectionItemzz"
import useListModalStore from "@/Store/useListModalStore"
import useToastzzStore from "@/Store/useToastzzStore"
import { useState } from "react"

interface Property {
    item: LB.Column
}

export default function CastField(property: Property) {
    const sListModalStore = useListModalStore()
    const sToastzzStore = useToastzzStore()

    const [item, setItem] = useState(property.item)

    function update(data: LB.Column) {
        setItem(data)
        return makeColumnCRUD().update(data).then(setItem).catch(sToastzzStore.showError)
    }

    return (
        <tr>
            <td>
                <span className={item.inTable ? "" : "text-secondary"}>{item.name}</span>
            </td>
            <td>
                <div className="form-check form-switch inline">
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
                    <label className="form-check-label" htmlFor={"fillableSwitchCheck" + item.id}></label>
                </div>
                <div className="form-check form-switch inline">
                    <input
                        checked={item.hidden}
                        onChange={(event) =>
                            update({
                                ...item,
                                hidden: event.target.checked,
                            })
                        }
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id={"hiddenSwitchCheck" + item.id}
                    />
                    <label className="form-check-label" htmlFor={"hiddenSwitchCheck" + item.id}></label>
                </div>
                <div className="form-check form-switch inline ms-3">
                    <input
                        checked={item.ro}
                        onChange={(event) =>
                            update({
                                ...item,
                                ro: event.target.checked,
                            })
                        }
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id={"roSwitchCheck" + item.id}
                    />
                    <label className="form-check-label" htmlFor={"roSwitchCheck" + item.id}></label>
                </div>
                <div className="form-check form-switch inline ms-3">
                    <input
                        checked={item.wo}
                        onChange={(event) =>
                            update({
                                ...item,
                                wo: event.target.checked,
                            })
                        }
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id={"woSwitchCheck" + item.id}
                    />
                    <label className="form-check-label" htmlFor={"woSwitchCheck" + item.id}></label>
                </div>
            </td>
            <td>{item.type}</td>
            <td>
                <div role="group" className="input-group">
                    <div className="input-group-prepend">
                        <button
                            onClick={function () {
                                const castzz = getCollectionItemzz("ModelFieldTypeCast")
                                sListModalStore.openCB(
                                    "Please select one item",
                                    castzz.map((item) => item.name),
                                    function (text) {
                                        return update({
                                            ...item,
                                            cast: text,
                                        })
                                    },
                                )
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
