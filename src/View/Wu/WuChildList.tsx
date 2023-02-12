import { makeTypeFormatCRUD, makeWuCRUD } from "@/Database/makeCRUD"
import { CompositionKindzz, OapiType } from "@/Model/Oapi"
import useToastzzStore from "@/Store/useToastzzStore"
import useWuParameterzzStore from "@/Store/useWuParameterzzStore"
import useWuzzStore from "@/Store/useWuzzStore"
import { useEffect, useState } from "react"
import SelectButton from "../Button/SelectButton"
import SelectStringButton from "../Button/SelectStringButton"
import WuParameterSelect from "../Button/WuParameterSelect"
import WebLink from "../Button/WebLink"
import WuChild from "./WuChild"
import useTypeFormatzzStore from "@/Store/useTypeFormatzzStore"
import makeNotFoundText from "@/Factory/makeNotFoundText"
import createTypeFormatArgumentzz from "@/Factory/createTypeFormatArgumentzz"
import makeTypeFormat from "@/Database/Factory/makeTypeFormat"

interface Property {
    item: LB.Wu
}

export default function WuChildList(property: Property) {
    const sToastzzStore = useToastzzStore()
    const sTypeFormatzzStore = useTypeFormatzzStore()
    const sWuParameterzzStore = useWuParameterzzStore()
    const sWuzzStore = useWuzzStore()

    const [childzz, setChildzz] = useState<LB.TypeFormat[]>([])

    useEffect(() => {
        setChildzz(
            sTypeFormatzzStore.itemzz.filter(
                (item) => item.ownerWuChildId === property.item.id,
            ),
        )
    }, [property.item, sTypeFormatzzStore.itemzz])

    function add(
        kind: OapiType,
        wuId: number = 1,
        wuParameterId: number | null = null,
    ) {
        const data = makeTypeFormat(kind, wuId, wuParameterId)
        data.ownerWuChildId = property.item.id
        return makeTypeFormatCRUD()
            .create(data)
            .then(function (tf) {
                if (kind === OapiType.Wu) {
                    return createTypeFormatArgumentzz(wuId, tf.id)
                }
            })
            .catch(sToastzzStore.showError)
    }

    function makeView() {
        return childzz.map((item) => {
            if (item.type === OapiType.Wu) {
                const wu = sWuzzStore.find(item.wuId!)
                if (wu === undefined) {
                    return (
                        <tr>
                            <td colSpan={3}>{makeNotFoundText("Wu", item.wuId)}</td>
                        </tr>
                    )
                }

                return <WuChild key={item.id} tf={item} wu={wu}></WuChild>
            }

            const wp = sWuParameterzzStore.find(item.wuParameterId ?? 0)
            if (wp === undefined) {
                return (
                    <tr>
                        <td colSpan={3}>{makeNotFoundText("WuParameter", "")}</td>
                    </tr>
                )
            }
            return (
                <tr key={item.id}>
                    <td>
                        <button
                            className="btn btn-outline-danger"
                            type="button"
                            onClick={function () {
                                makeTypeFormatCRUD()
                                    .delete(item.id)
                                    .catch(sToastzzStore.showError)
                            }}
                        >
                            - {wp.name}
                        </button>
                    </td>
                    <td></td>
                    <td></td>
                </tr>
            )
        })
    }

    return (
        <div>
            <table className="table">
                <caption>
                    <h3 className="inline me-3">Composition</h3>
                    <SelectStringButton
                        className="inline wa"
                        itemzz={CompositionKindzz}
                        value={property.item.type}
                        change={function (type) {
                            makeWuCRUD()
                                .update({
                                    ...property.item,
                                    type,
                                })
                                .catch(sToastzzStore.showError)
                        }}
                    ></SelectStringButton>

                    <WebLink
                        className="ms-3"
                        href="https://spec.openapis.org/oas/v3.0.3#models-with-polymorphism-support"
                    >
                        doc
                    </WebLink>
                </caption>
                <thead>
                    <tr>
                        <th></th>
                        <th>column</th>
                        <th>type</th>
                    </tr>
                </thead>

                <tbody>{makeView()}</tbody>

                <tfoot>
                    <tr>
                        <td>
                            <SelectButton
                                className="form-select"
                                itemzz={sWuzzStore.itemzz}
                                value={0}
                                verb="Wu"
                                change={(value) => {
                                    const found = sWuzzStore.find(value)
                                    if (found === undefined) {
                                        return
                                    }
                                    if (found.id === property.item.id) {
                                        sToastzzStore.showDanger(
                                            "Including self will cause circular reference error",
                                        )
                                        return
                                    }
                                    add(OapiType.Wu, found.id)
                                }}
                            ></SelectButton>
                        </td>
                        <td>
                            <WuParameterSelect
                                add={(found) => add(OapiType.WuParameter, 1, found.id)}
                                isWu
                                wuId={property.item.id}
                            ></WuParameterSelect>
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <span className="text-danger">
                                Be careful of circular reference
                            </span>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}
