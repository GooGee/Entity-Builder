import { makeWuCRUD } from "@/Database/makeCRUD"
import getCollectionItemzz from "@/Service/getCollectionItemzz"
import useColumnzzStore from "@/Store/useColumnzzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import useWuColumnzzStore from "@/Store/useWuColumnzzStore"
import { useEffect, useState } from "react"
import WebLink from "../Button/WebLink"
import Column from "./Column"

interface Property {
    item: LB.Wu
    noCaption?: boolean
}

export default function WuColumnList(property: Property) {
    const sColumnzzStore = useColumnzzStore()
    const sToastzzStore = useToastzzStore()
    const sWuColumnzzStore = useWuColumnzzStore()

    const [columnzz, setColumnzz] = useState<LB.Column[]>([])
    const [wuColumnMap, setWuColumnMap] = useState<Map<number, LB.WuColumn>>(new Map())

    const constraintzz = getCollectionItemzz("ValidationRule")

    useEffect(() => {
        setColumnzz(
            sColumnzzStore.itemzz.filter(
                (item) => item.entityId === property.item.entityId,
            ),
        )
        const zz = sWuColumnzzStore.itemzz.filter(
            (item) => item.wuId === property.item.id,
        )
        setWuColumnMap(new Map(zz.map((item) => [item.columnId, item])))
    }, [sColumnzzStore.itemzz, property.item, sWuColumnzzStore.itemzz])

    function getKey(item: LB.Column) {
        const wc = wuColumnMap.get(item.id)
        return `${property.item.id} ${wc?.id} ${item.id}`
    }

    function makeCaption() {
        if (property.noCaption) {
            return null
        }

        return (
            <caption>
                <h3 className="inline me-3">Column</h3>
                <div className="form-check form-switch inline">
                    <input
                        checked={property.item.isRequest}
                        onChange={function (event) {
                            makeWuCRUD()
                                .update({
                                    ...property.item,
                                    isRequest: event.target.checked,
                                })
                                .catch(sToastzzStore.showError)
                        }}
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="isRequestSwitchCheck"
                    />
                    <label className="form-check-label" htmlFor="isRequestSwitchCheck">
                        isRequest
                    </label>
                </div>

                <WebLink
                    className="ms-3"
                    href="https://spec.openapis.org/oas/v3.0.3#schema-object"
                >
                    doc
                </WebLink>
            </caption>
        )
    }

    return (
        <table className="table td0-tal">
            {makeCaption()}

            <thead>
                <tr>
                    <th className="w333">include / alias (can be empty)</th>
                    <th>
                        {property.item.isRequest
                            ? "constraint"
                            : "isArray / nullable / type / format"}

                        {property.item.isRequest ? null : (
                            <WebLink
                                className="ms-3"
                                href="https://spec.openapis.org/oas/v3.0.3#data-types"
                            >
                                doc
                            </WebLink>
                        )}
                    </th>
                </tr>
            </thead>
            <tbody>
                {columnzz.map((item) => (
                    <Column
                        key={getKey(item)}
                        constraintzz={constraintzz}
                        isRequest={property.item.isRequest}
                        item={item}
                        wc={wuColumnMap.get(item.id)}
                        wu={property.item}
                    ></Column>
                ))}
            </tbody>
        </table>
    )
}
