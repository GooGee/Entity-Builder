import { IndexTypezz } from "@/Database/IndexType"
import { makeIndexCRUD } from "@/Database/makeCRUD"
import { makeIdItemMap } from "@/Factory/makeMap"
import useColumnzzStore from "@/Store/useColumnzzStore"
import useIndexzzStore from "@/Store/useIndexzzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import { useState, useEffect } from "react"
import SelectStringButton from "../Button/SelectStringButton"
import showConfirm from "../Dialog/showConfirm"
import IndexColumnList from "./IndexColumnList"

interface Property {
    entity: LB.Entity
}

export default function IndexList(property: Property) {
    const sColumnzzStore = useColumnzzStore()
    const sIndexzzStore = useIndexzzStore()
    const sToastzzStore = useToastzzStore()

    const [columnzz, setColumnzz] = useState<LB.Column[]>([])
    const [indexzz, setIndexzz] = useState<LB.Index[]>([])

    const cicm = makeIdItemMap(columnzz)

    useEffect(() => {
        setColumnzz(
            sColumnzzStore.itemzz.filter(
                (item) => item.entityId === property.entity.id,
            ),
        )
    }, [property.entity, sColumnzzStore.itemzz])

    useEffect(() => {
        setIndexzz(
            sIndexzzStore.itemzz.filter((item) => item.entityId === property.entity.id),
        )
    }, [property.entity, sIndexzzStore.itemzz])

    function update(data: LB.Index) {
        makeIndexCRUD().update(data).catch(sToastzzStore.showError)
    }

    return (
        <table className="table">
            <caption>
                <h3 className="inline me-3">Index</h3>
            </caption>
            <thead>
                <tr>
                    <th className="w222">type</th>
                    <th>column</th>
                </tr>
            </thead>
            <tbody>
                {indexzz.map((item) => (
                    <tr key={item.id}>
                        <td>
                            <div className="input-group">
                                <button
                                    onClick={function () {
                                        showConfirm()
                                            .then((response) => {
                                                if (response.isConfirmed) {
                                                    return makeIndexCRUD().delete(
                                                        item.id,
                                                    )
                                                }
                                            })
                                            .catch(sToastzzStore.showError)
                                    }}
                                    className="btn btn-outline-danger"
                                    type="button"
                                >
                                    -
                                </button>
                                <SelectStringButton
                                    itemzz={IndexTypezz}
                                    value={item.type}
                                    change={function (type) {
                                        update({ ...item, type })
                                    }}
                                ></SelectStringButton>
                            </div>
                        </td>
                        <td>
                            <IndexColumnList
                                cicm={cicm}
                                columnzz={columnzz}
                                indexId={item.id}
                            ></IndexColumnList>
                        </td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td>
                        <SelectStringButton
                            isAdd
                            itemzz={IndexTypezz}
                            value=""
                            change={function (type) {
                                makeIndexCRUD()
                                    .create({ entityId: property.entity.id, type })
                                    .catch(sToastzzStore.showError)
                            }}
                        ></SelectStringButton>
                    </td>
                    <td></td>
                </tr>
            </tfoot>
        </table>
    )
}
