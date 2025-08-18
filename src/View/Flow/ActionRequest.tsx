import makeRequest from "@/Database/Factory/makeRequest"
import makeTypeFormat from "@/Database/Factory/makeTypeFormat"
import { makeActionWu } from "@/Database/Factory/makeWu"
import { makeRequestCRUD, makeTypeFormatCRUD, makeModuleActionCRUD, makeParameterMapCRUD } from "@/Database/makeCRUD"
import { OapiType } from "@/Model/Oapi"
import { makeParameterName, makeRequestName } from "@/Service/makeName"
import useFlowPageStore, { StepEnum } from "@/Store/useFlowPageStore"
import useRequestzzStore from "@/Store/useRequestzzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import useTypeFormatzzStore from "@/Store/useTypeFormatzzStore"
import useWuColumnzzStore from "@/Store/useWuColumnzzStore"
import useWuzzStore from "@/Store/useWuzzStore"
import { useState, useEffect } from "react"
import SelectButton from "../Button/SelectButton"
import ParameterList from "../Oapi/ParameterList"
import WuColumnList from "../Wu/WuColumnList"
import createColumnTypeFormat from "@/Factory/createColumnTypeFormat"
import useEntityzzStore from "@/Store/useEntityzzStore"
import { PageEnum } from "@/menuzz"
import useColumnzzStore from "@/Store/useColumnzzStore"

const Step = StepEnum.Request

interface Property {
    action: string
    entity: LB.Entity
    ma: LB.ModuleAction
    module: LB.Module
    step: string
}

export default function ActionRequest(property: Property) {
    const sFlowPageStore = useFlowPageStore()
    const sRequestzzStore = useRequestzzStore()
    const sToastzzStore = useToastzzStore()
    const sTypeFormatzzStore = useTypeFormatzzStore()
    const sWuColumnzzStore = useWuColumnzzStore()
    const sWuzzStore = useWuzzStore()

    const [time, setTime] = useState(0)
    const [wu, setWu] = useState<LB.Wu>()

    const nameRequest = makeRequestName(property.module, property.ma, property.entity)
    const request = sRequestzzStore.find(property.ma.requestId)
    const item = sRequestzzStore.findByName(nameRequest)

    const alias = "Filter"
    const FilterName = makeParameterName(property.module, property.ma, property.entity, alias)

    useEffect(() => {
        if (request === undefined) {
            setWu(undefined)
            return
        }

        const tf = sTypeFormatzzStore.itemzz.find((item) => item.ownerRequestId === request.id)
        if (tf === undefined) {
            return
        }

        if (tf.type === OapiType.Wu) {
            setWu(sWuzzStore.find(tf.wuId))
        } else {
            setWu(undefined)
        }
    }, [property.ma.requestId])

    if (property.step === Step) {
        // ok
    } else {
        const wczz = sWuColumnzzStore.itemzz.filter((item) => item.wuId === wu?.id)

        return (
            <div className="my-3">
                <h3 className="pointer hover-blue text-secondary" onClick={() => sFlowPageStore.setStep(Step)}>
                    {Step}
                </h3>

                {request === undefined ? null : (
                    <div className="mt-3">
                        {request.name}{" "}
                        {wu === undefined || request.id === 1 ? null : wczz.length === 0 ? (
                            <span className="text-danger">(0 fields)</span>
                        ) : (
                            <span className="text-secondary">({wczz.length} fields)</span>
                        )}
                    </div>
                )}
            </div>
        )
    }

    function makeParameterFilter() {
        const qp = useEntityzzStore.getState().findByName(PageEnum.ParameterInQuery)
        if (qp === undefined) {
            return
        }
        const found = useColumnzzStore
            .getState()
            .itemzz.find((item) => item.entityId === qp.id && item.name === FilterName)
        if (found) {
            sToastzzStore.showError(`Parameter ${FilterName} already exists`)
            return
        }

        const tf = makeTypeFormat(OapiType.Wu, wu?.id || 1)
        return createColumnTypeFormat(qp.id, FilterName, "object", "", 0, "form", "", false, tf)
            .then(function (column) {
                sToastzzStore.showSuccess(`Parameter ${FilterName} created`)

                return makeParameterMapCRUD().create({
                    alias,
                    columnId: column.id,
                    pathId: null,
                    requestId: property.ma.requestId,
                    responseId: null,
                })
            })
            .then(() => setTime(new Date().getTime()))
            .catch(sToastzzStore.showError)
    }

    function makeRequestWu() {
        return makeActionWu(property.module, property.ma, property.entity, true, sWuzzStore)
            .then((wu) => {
                setWu(wu)
                sToastzzStore.showSuccess(`Wu ${wu.name} created`)
                return makeRequestCRUD()
                    .create(makeRequest(nameRequest))
                    .then((request) => {
                        sToastzzStore.showSuccess(`Request ${request.name} created`)
                        const data = makeTypeFormat(OapiType.Wu, wu.id)
                        data.ownerRequestId = request.id
                        return makeTypeFormatCRUD()
                            .create(data)
                            .then(() => {
                                return makeModuleActionCRUD()
                                    .update({
                                        ...property.ma,
                                        requestId: request.id,
                                    })
                                    .then((ma) => sFlowPageStore.setAction(property.action, ma))
                            })
                    })
            })
            .catch(sToastzzStore.showError)
    }

    return (
        <div>
            <div className="my-2">
                {item ? null : (
                    <span onClick={makeRequestWu} className="btn btn-outline-primary">
                        + {nameRequest}
                    </span>
                )}
            </div>
            <div>
                <SelectButton
                    className="wa"
                    itemzz={sRequestzzStore.itemzz.filter(
                        (item) => item.id === 1 || item.name.startsWith(property.entity.name + "_"),
                    )}
                    value={property.ma.requestId}
                    change={function (requestId) {
                        makeModuleActionCRUD()
                            .update({ ...property.ma, requestId })
                            .then((ma) => sFlowPageStore.setAction(property.action, ma))
                            .catch(sToastzzStore.showError)
                    }}
                ></SelectButton>
            </div>

            {wu === undefined ? null : (
                <>
                    <h3 className="my-3">{wu.name}</h3>
                    <WuColumnList item={wu} noCaption></WuColumnList>
                </>
            )}

            <div>
                <h3 className="inline me-3">Parameter</h3>
                {item && property.ma.name.includes("ReadPage") ? (
                    <button onClick={makeParameterFilter} className="btn btn-outline-primary" type="button">
                        + {FilterName}
                    </button>
                ) : null}
            </div>
            <ParameterList time={time} requestId={property.ma.requestId}></ParameterList>
        </div>
    )
}
