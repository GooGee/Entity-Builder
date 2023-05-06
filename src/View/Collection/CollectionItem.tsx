import { makeCollectionItemCRUD } from "@/Database/makeCRUD"
import showConfirm from "@/View/Dialog/showConfirm"
import useToastzzStore from "@/Store/useToastzzStore"
import { useState } from "react"
import showInput from "../Dialog/showInput"

interface Property {
    item: LB.CollectionItem
}

export default function CollectionItem(property: Property) {
    const sToastzzStore = useToastzzStore()

    const [item, setItem] = useState({ ...property.item })

    function update(item: LB.CollectionItem) {
        setItem(item)
        makeCollectionItemCRUD()
            .update(item)
            .then(setItem)
            .catch(sToastzzStore.showError)
    }

    return (
        <tr>
            <td>
                <div className="btn-group">
                    <span
                        onClick={() => {
                            showConfirm()
                                .then((response) => {
                                    if (response.isConfirmed) {
                                        return makeCollectionItemCRUD().delete(item.id)
                                    }
                                })
                                .catch(sToastzzStore.showError)
                        }}
                        className="btn btn-outline-primary danger"
                    >
                        -
                    </span>
                    <span
                        onClick={() =>
                            showInput("Please input the name", item.name)
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
                    >
                        {item.name}
                    </span>
                </div>
            </td>
            <td>
                <input
                    value={item.value}
                    onChange={(event) =>
                        update({
                            ...item,
                            value: event.target.value,
                        })
                    }
                    className="form-control"
                    type="text"
                />
            </td>
            <td>
                <input
                    value={item.tag}
                    onChange={(event) =>
                        update({
                            ...item,
                            tag: event.target.value,
                        })
                    }
                    className="form-control"
                    type="text"
                />
            </td>
        </tr>
    )
}
