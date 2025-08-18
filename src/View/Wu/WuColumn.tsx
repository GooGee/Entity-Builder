import { makeWuColumnCRUD } from "@/Database/makeCRUD"
import makeNotFoundText from "@/Factory/makeNotFoundText"
import useToastzzStore from "@/Store/useToastzzStore"
import useTypeFormatzzStore from "@/Store/useTypeFormatzzStore"
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
    const sTypeFormatzzStore = useTypeFormatzzStore()

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

        const tf = sTypeFormatzzStore.itemzz.find((item) => item.ownerColumnId === property.item.id)
        if (tf?.wuParameterId) {
            // ok
        } else {
            if (property.wu.isRequest) {
                return <ConstraintList wc={property.wc}></ConstraintList>
            }
        }

        return <TypeFormatText id={property.item.id} isRoot item={tf} wuId={property.wu.id}></TypeFormatText>
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
                    <label className="form-check-label text-secondary" htmlFor={"includeSwitchCheck" + property.item.id}>
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
