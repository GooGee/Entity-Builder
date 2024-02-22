import { makeColumnCRUD } from "@/Database/makeCRUD"
import getCollectionItemzz from "@/Service/getCollectionItemzz"
import useListModalStore from "@/Store/useListModalStore"
import useToastzzStore from "@/Store/useToastzzStore"
import { useState } from "react"

interface Property {
    item: LB.Column
}

export default function FactoryColumn(property: Property) {
    const sListModalStore = useListModalStore()
    const sToastzzStore = useToastzzStore()

    const [item, setItem] = useState(property.item)

    function select() {
        const namezz = getCollectionItemzz("FakerMethod").map((item) => item.name)
        sListModalStore.openCB("Select a method", namezz, function (text) {
            update({
                ...item,
                fakeMethod: text,
            }).catch(sToastzzStore.showError)
        })
    }

    function update(data: LB.Column) {
        setItem(data)
        return makeColumnCRUD().update(data).then(setItem).catch(sToastzzStore.showError)
    }

    return (
        <tr>
            <td>{item.name}</td>
            <td>
                <div className="form-check form-switch inline">
                    <input
                        checked={item.fakeRaw === false}
                        onChange={(event) =>
                            update({
                                ...item,
                                fakeRaw: event.target.checked === false,
                            })
                        }
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id={"fakeRowSwitchCheck" + item.id}
                    />
                    <label className="form-check-label" htmlFor={"fakeRowSwitchCheck" + item.id}></label>
                </div>
                {item.fakeRaw ? null : (
                    <>
                        <div className="form-check form-switch inline">
                            <input
                                checked={item.fakeUnique}
                                onChange={(event) =>
                                    update({
                                        ...item,
                                        fakeUnique: event.target.checked,
                                    })
                                }
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id={"fakeUniqueSwitchCheck" + item.id}
                            />
                            <label className="form-check-label" htmlFor={"fakeUniqueSwitchCheck" + item.id}>
                                unique
                            </label>
                        </div>
                        <button onClick={select} className="btn btn-outline-primary ms-1">
                            {item.fakeMethod === "" ? "+" : item.fakeMethod}
                        </button>
                    </>
                )}
            </td>
            <td>
                <input
                    value={item.fakeText}
                    onChange={(event) =>
                        update({
                            ...item,
                            fakeText: event.target.value,
                        })
                    }
                    type="text"
                    className="form-control"
                />
            </td>
        </tr>
    )
}
