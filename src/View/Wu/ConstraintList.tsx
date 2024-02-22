import { makeForeignKeyId, SchemaEnum } from "@/Database/createSchema"
import { makeWuColumnConstraintCRUD } from "@/Database/makeCRUD"
import useColumnConstraintzzStore from "@/Store/useColumnConstraintzzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import { useState, useEffect } from "react"

interface Property {
    wc: LB.WuColumn
}

export default function ConstraintList(property: Property) {
    const sColumnConstraintzzStore = useColumnConstraintzzStore()
    const sToastzzStore = useToastzzStore()

    const [constraintzz, setConstraintzz] = useState<LB.ColumnConstraint[]>([])
    const [wcczz, setWcczz] = useState<LB.WuColumnConstraint[]>([])

    useEffect(() => {
        setConstraintzz(sColumnConstraintzzStore.itemzz.filter((item) => item.columnId === property.wc.columnId))
        refresh()
    }, [])

    function refresh() {
        makeWuColumnConstraintCRUD()
            .findAllBelongTo([property.wc.id], makeForeignKeyId(SchemaEnum.WuColumn))
            .then((response) => setWcczz(response))
            .catch(sToastzzStore.showError)
    }

    function makeView(item: LB.ColumnConstraint) {
        const found = wcczz.find((wcc) => wcc.columnConstraintId === item.id && wcc.wuColumnId === property.wc.id)
        return (
            <td>
                <div className="form-check form-switch inline">
                    <input
                        checked={found !== undefined}
                        onChange={function () {
                            if (found) {
                                makeWuColumnConstraintCRUD().delete(found.id).then(refresh).catch(sToastzzStore.showError)
                                return
                            }
                            makeWuColumnConstraintCRUD()
                                .create({
                                    wuColumnId: property.wc.id,
                                    columnConstraintId: item.id,
                                })
                                .then(refresh)
                                .catch(sToastzzStore.showError)
                        }}
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id={"wccSwitchCheck" + item.id}
                    />
                    <label className="form-check-label text-secondary" htmlFor={"wccSwitchCheck" + item.id}>
                        {item.name}
                        {item.parameter ? ":" + item.parameter : ""}
                    </label>
                </div>
            </td>
        )
    }

    return (
        <table className="table table-borderless table-sm">
            <tbody>
                {constraintzz.map((item) => (
                    <tr key={item.id}>{makeView(item)}</tr>
                ))}
            </tbody>
        </table>
    )
}
