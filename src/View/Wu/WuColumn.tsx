import { makeColumnCRUD, makeWuColumnCRUD } from "@/Database/makeCRUD"
import useToastzzStore from "@/Store/useToastzzStore"
import TypeFormatText from "../Reference/TypeFormatText"
import ConstraintList from "./ConstraintList"

interface Property {
    isRequest: boolean
    item: LB.Column
    wc?: LB.WuColumn
    wu: LB.Wu
}

export default function WuColumn(property: Property) {
    const sToastzzStore = useToastzzStore()

    function add() {
        if (property.wc) {
            makeWuColumnCRUD().delete(property.wc.id).catch(sToastzzStore.showError)
            return
        }

        makeWuColumnCRUD()
            .create({
                wuId: property.wu.id,
                columnId: property.item.id,
                alias: "",
            })
            .catch(sToastzzStore.showError)
    }

    function makeView() {
        if (property.wc === undefined) {
            return null
        }

        if (property.wu.isRequest) {
            return <ConstraintList wc={property.wc}></ConstraintList>
        }

        return (
            <TypeFormatText
                id={property.item.id}
                isRoot
                item={property.item.tf}
                wuId={property.wu.id}
                update={function (tf) {
                    makeColumnCRUD()
                        .update({
                            ...property.item,
                            tf,
                        })
                        .catch(sToastzzStore.showError)
                }}
            ></TypeFormatText>
        )
    }

    return (
        <tr>
            <td>
                <div className="form-check form-switch inline">
                    <input
                        checked={property.wc !== undefined}
                        onChange={add}
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id={"includeSwitchCheck" + property.item.id}
                    />
                    <label
                        className="form-check-label text-secondary"
                        htmlFor={"includeSwitchCheck" + property.item.id}
                    >
                        {property.wc ? "" : property.item.name}
                    </label>
                </div>
                {property.wc ? (
                    <input
                        value={property.wc.alias}
                        onChange={(event) =>
                            makeWuColumnCRUD()
                                .update({
                                    ...property.wc!,
                                    alias: event.target.value,
                                })
                                .catch(sToastzzStore.showError)
                        }
                        type="text"
                        className="form-control inline wa"
                        placeholder={property.item.name}
                    />
                ) : null}
            </td>
            <td>{makeView()}</td>
        </tr>
    )
}
