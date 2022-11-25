import makeWuChild from "@/Database/Factory/makeWuChild"
import { makeWuChildCRUD, makeWuCRUD } from "@/Database/makeCRUD"
import { makeIdItemMap } from "@/Factory/makeMap"
import { CompositionKindzz, OapiType } from "@/Model/Oapi"
import useToastzzStore from "@/Store/useToastzzStore"
import useWuChildzzStore from "@/Store/useWuChildzzStore"
import useWuParameterzzStore from "@/Store/useWuParameterzzStore"
import useWuzzStore from "@/Store/useWuzzStore"
import { useEffect, useState } from "react"
import SelectButton from "../Button/SelectButton"
import SelectStringButton from "../Button/SelectStringButton"
import TypeParameterSelect from "../Button/TypeParameterSelect"
import WebLink from "../Button/WebLink"
import WuChild from "./WuChild"

interface Property {
    item: LB.Wu
}

export default function WuChildList(property: Property) {
    const sToastzzStore = useToastzzStore()
    const sWuChildzzStore = useWuChildzzStore()
    const sWuParameterzzStore = useWuParameterzzStore()
    const sWuzzStore = useWuzzStore()

    const [childzz, setChildzz] = useState<LB.WuChild[]>([])

    const wumap = makeIdItemMap(sWuzzStore.itemzz)

    useEffect(() => {
        setChildzz(
            sWuChildzzStore.itemzz.filter((item) => item.wuId === property.item.id),
        )
    }, [property.item, sWuChildzzStore.itemzz])

    function add(kind: OapiType, targetId: number) {
        return makeWuChildCRUD()
            .create(makeWuChild(property.item.id, kind, targetId))
            .catch(sToastzzStore.showError)
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

                <tbody>
                    {childzz.map((item) =>
                        item.tf.type === OapiType.Wu ? (
                            <WuChild
                                key={item.id}
                                item={item}
                                wu={wumap.get(item.tf.targetId)}
                            ></WuChild>
                        ) : (
                            <tr key={item.id}>
                                <td>
                                    <button
                                        className="btn btn-outline-primary danger"
                                        type="button"
                                        onClick={function () {
                                            makeWuChildCRUD()
                                                .delete(item.id)
                                                .catch(sToastzzStore.showError)
                                        }}
                                    >
                                        -{" "}
                                        {sWuParameterzzStore.find(item.tf.targetId)
                                            ?.name ??
                                            `TypeParameter ${item.tf.targetId} not found`}
                                    </button>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                        ),
                    )}
                </tbody>

                <tfoot>
                    <tr>
                        <td>
                            <SelectButton
                                className="form-select inline wa"
                                itemzz={sWuzzStore.itemzz}
                                value={0}
                                verb="Wu"
                                change={(value) => {
                                    const found = sWuzzStore.find(value)
                                    if (found === undefined) {
                                        return
                                    }
                                    add(OapiType.Wu, found.id)
                                }}
                            ></SelectButton>
                        </td>
                        <td>
                            <TypeParameterSelect
                                add={(found) => add(OapiType.TypeParameter, found.id)}
                                isWu
                                wuId={property.item.id}
                            ></TypeParameterSelect>
                        </td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}
