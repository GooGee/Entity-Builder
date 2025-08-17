import makeModuleActionResponse from "@/Database/Factory/makeModuleActionResponse"
import makeResponse from "@/Database/Factory/makeResponse"
import makeTypeFormat from "@/Database/Factory/makeTypeFormat"
import { findOrMakeWu } from "@/Database/Factory/makeWu"
import {
    makeResponseCRUD,
    makeTypeFormatCRUD,
    makeModuleActionResponseCRUD,
    makeModuleActionCRUD,
} from "@/Database/makeCRUD"
import createTypeFormatArgumentzz from "@/Factory/createTypeFormatArgumentzz"
import { OapiType } from "@/Model/Oapi"
import getCollectionItemzz from "@/Service/getCollectionItemzz"
import { makeResponseName } from "@/Service/makeName"
import useFlowPageStore, { StepEnum } from "@/Store/useFlowPageStore"
import useResponsezzStore from "@/Store/useResponsezzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import useTypeFormatzzStore from "@/Store/useTypeFormatzzStore"
import useWuColumnzzStore from "@/Store/useWuColumnzzStore"
import useWuzzStore from "@/Store/useWuzzStore"
import { useState, useEffect } from "react"
import SelectButton from "../Button/SelectButton"
import WuColumnList from "../Wu/WuColumnList"
import ActionResponse from "./ActionResponse"
import { findWrapperWuId, WuNamezz } from "@/Service/findWrapperWu"

const Step = StepEnum.Response

interface Property {
    entity: LB.Entity
    ma: LB.ModuleAction
    module: LB.Module
    step: string
}

export default function ResponseList(property: Property) {
    const sResponsezzStore = useResponsezzStore()
    const sToastzzStore = useToastzzStore()
    const sTypeFormatzzStore = useTypeFormatzzStore()
    const sWuColumnzzStore = useWuColumnzzStore()
    const sWuzzStore = useWuzzStore()
    const suseFlowPageStore = useFlowPageStore()

    const [itemzz, setItemzz] = useState<LB.ModuleActionResponse[]>([])

    const nameResponse = makeResponseName(property.ma.name, property.entity)

    const statuszz = getCollectionItemzz("HttpStatus")

    let unmounted = false

    const r200 = itemzz.find((item) => item.status === "200")
    const wu = getWu()

    useEffect(() => {
        refresh().catch(sToastzzStore.showError)
        return function () {
            unmounted = true
        }
    }, [property.ma, property.entity])

    if (property.step === Step) {
        // ok
    } else {
        function makeWuFieldCount() {
            if (wu === undefined) {
                return null
            }

            const wczz = sWuColumnzzStore.itemzz.filter((item) => item.wuId === wu?.id)
            return wczz.length === 0 ? (
                <span className="text-danger">({wu.name} 0 fields)</span>
            ) : (
                <span className="text-secondary">
                    ({wu.name} {wczz.length} fields)
                </span>
            )
        }

        return (
            <>
                <table className="table table-borderless table-sm">
                    <tbody>
                        {r200 === undefined ? (
                            <tr>
                                <td colSpan={2}>
                                    <div className="text-danger">Response 200 is missing</div>
                                </td>
                            </tr>
                        ) : null}

                        {itemzz.map((item) => (
                            <tr key={item.status}>
                                <td className="w111">{item.status}</td>
                                <td>
                                    {sResponsezzStore.find(item.responseId)?.name}{" "}
                                    {item.id === r200?.id ? makeWuFieldCount() : null}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        )
    }

    function getWu() {
        if (r200 === undefined) {
            return undefined
        }

        const tf = sTypeFormatzzStore.itemzz.find((item) => item.ownerResponseId === r200?.responseId)
        if (tf && tf.type === OapiType.Wu) {
            const child = sTypeFormatzzStore.itemzz.find((item) => item.ownerId === tf.id)
            if (child && child.type === OapiType.Wu) {
                return sWuzzStore.find(child.wuId)
            }
        }
        return undefined
    }

    function makeResponseWu() {
        return makeResponseCRUD()
            .create(makeResponse(nameResponse))
            .then((lbr) => {
                sToastzzStore.showSuccess(`Response ${lbr.name} created`)
                const wrapperId = findWrapperWuId(property.ma.name, sWuzzStore.itemzz)
                const data = makeTypeFormat(OapiType.Wu, wrapperId)
                data.ownerResponseId = lbr.id
                return makeTypeFormatCRUD()
                    .create(data)
                    .then(function (tf) {
                        return createTypeFormatArgumentzz(wrapperId, tf.id).then(function (tfzz) {
                            if (tfzz.length === 0) {
                                return
                            }
                            return findOrMakeWu(property.entity.name, property.entity, false, sWuzzStore)
                                .then((wu) =>
                                    makeTypeFormatCRUD().update({
                                        ...tfzz[0],
                                        wuId: wu.id,
                                    }),
                                )
                                .then(() => sToastzzStore.showSuccess(`Wu ${property.entity.name} created`))
                        })
                    })
                    .then(function () {
                        if (r200 === undefined) {
                            return makeModuleActionResponseCRUD()
                                .create(makeModuleActionResponse("200", property.ma.id, lbr.id))
                                .then(function () {
                                    sToastzzStore.showSuccess("Response 200 created")
                                })
                        }
                        return makeModuleActionResponseCRUD()
                            .update({
                                ...r200,
                                responseId: lbr.id,
                            })
                            .then(function () {})
                    })
            })
            .then(refresh)
            .catch(sToastzzStore.showError)
    }

    function makeWuSelect() {
        const wuzz = sWuzzStore.itemzz.filter((item) => WuNamezz.includes(item.name))
        if (wuzz.length === 0) {
            return null
        }

        const found = wuzz.find((item) => item.id === property.ma.responseWuId)

        return (
            <div>
                <SelectButton
                    className="wa inline"
                    itemzz={wuzz}
                    value={found?.id ?? wuzz[0].id}
                    change={function (index, item) {
                        if (item) {
                            makeModuleActionCRUD()
                                .update({ ...property.ma, responseWuId: item.id })
                                .then(function (item) {
                                    suseFlowPageStore.setAction(item.name, item)
                                })
                        }
                    }}
                ></SelectButton>

                {found == null ? null : (
                    <span>
                        &nbsp;auto add Response with `{found.name}&lt;{property.entity.name}&gt;` to api doc, if no
                        Response added.
                    </span>
                )}
            </div>
        )
    }

    function refresh() {
        return makeModuleActionResponseCRUD()
            .findAll()
            .then((response) => {
                if (unmounted) {
                    return
                }
                const itemzz = response.filter((item) => item.moduleActionId === property.ma.id)
                setItemzz(itemzz)
            })
    }

    return (
        <>
            <table className="table td0-tal">
                <caption>
                    {makeWuSelect()}
                    <div>
                        {sResponsezzStore.findByName(nameResponse) ? null : (
                            <span onClick={makeResponseWu} className="btn btn-outline-primary mt-1">
                                + {nameResponse}
                            </span>
                        )}
                    </div>
                </caption>
                <thead>
                    <tr>
                        <th>status</th>
                        <th>name</th>
                        <th>content</th>
                    </tr>
                </thead>
                <tbody>
                    {itemzz.map((item) => (
                        <ActionResponse
                            key={item.status}
                            entity={property.entity}
                            item={item}
                            refresh={refresh}
                            statuszz={statuszz}
                        ></ActionResponse>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td>
                            <SelectButton
                                isAdd
                                itemzz={statuszz}
                                value={0}
                                change={function (id, item) {
                                    makeModuleActionResponseCRUD()
                                        .create(makeModuleActionResponse(item?.name ?? "", property.ma.id))
                                        .then(refresh)
                                        .catch(sToastzzStore.showError)
                                }}
                            ></SelectButton>
                        </td>
                        <td></td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>

            {r200 && wu ? (
                <WuColumnList
                    item={wu}
                    caption={
                        <caption>
                            <h3 className="text-dark">Wu {wu.name}</h3>
                        </caption>
                    }
                ></WuColumnList>
            ) : null}
        </>
    )
}
