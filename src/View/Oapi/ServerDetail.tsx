import { makeServerCRUD, makeServerVariableCRUD } from "@/Database/makeCRUD"
import useToastzzStore from "@/Store/useToastzzStore"
import useVariablezzStore from "@/Store/useVariablezzStore"
import { useEffect, useState } from "react"
import DeleteChangeButton from "../Button/DeleteChangeButton"
import showInput from "../Dialog/showInput"
import ItemList from "../Part/ItemList"

interface Property {
    item: LB.Server
}

export default function ServerDetail(property: Property) {
    const sVariablezzStore = useVariablezzStore()
    const sToastzzStore = useToastzzStore()

    const [item, setItem] = useState(property.item)
    const [itemzz, setItemzz] = useState<LB.ServerVariable[]>([])

    useEffect(() => {
        refresh()
    }, [])

    function refresh() {
        makeServerVariableCRUD()
            .findAll()
            .then((response) => setItemzz(response.filter((item) => item.serverId === property.item.id)))
            .catch(sToastzzStore.showError)
    }

    function update(item: LB.Server) {
        setItem(item)
        makeServerCRUD().update(item).then(setItem).catch(sToastzzStore.showError)
    }

    return (
        <tr>
            <td>
                <div>
                    <div className="form-check form-switch inline">
                        <input
                            checked={property.item.global}
                            onChange={(event) =>
                                update({
                                    ...property.item!,
                                    global: event.target.checked,
                                })
                            }
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id={"globalSwitchCheck" + property.item.id}
                        />
                        <label className="form-check-label" htmlFor={"globalSwitchCheck" + property.item.id}></label>
                    </div>

                    <DeleteChangeButton
                        className="ms-1"
                        name={item.name}
                        onChange={function () {
                            showInput("Please input server URI", item.name).then((response) => {
                                if (response.isConfirmed) {
                                    update({ ...item, name: response.value })
                                }
                            })
                        }}
                        onDelete={function (isConfirmed) {
                            if (isConfirmed) {
                                makeServerCRUD().delete(item.id).catch(sToastzzStore.showError)
                            }
                        }}
                    ></DeleteChangeButton>
                </div>

                <input
                    value={item.description}
                    onChange={(event) =>
                        update({
                            ...item,
                            description: event.target.value,
                        })
                    }
                    className="form-control mt-1"
                    placeholder="description"
                    type="text"
                />
            </td>
            <td>
                <ItemList
                    fieldName="variableId"
                    itemzz={itemzz}
                    source={sVariablezzStore.itemzz}
                    create={function (variableId) {
                        return makeServerVariableCRUD()
                            .create({
                                serverId: item.id,
                                variableId,
                            })
                            .then(() => refresh())
                    }}
                    delete={function (id) {
                        return makeServerVariableCRUD()
                            .delete(id)
                            .then(() => refresh())
                    }}
                ></ItemList>
            </td>
        </tr>
    )
}
