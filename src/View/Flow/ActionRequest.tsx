import { cloneFile } from "@/Database/Factory/makeFile"
import makeRequest from "@/Database/Factory/makeRequest"
import { makeActionWu } from "@/Database/Factory/makeWu"
import { makeModuleActionCRUD, makeRequestCRUD } from "@/Database/makeCRUD"
import LayerEnum from "@/Model/LayerEnum"
import { OapiType } from "@/Model/Oapi"
import { makeRequestName, makeWuName } from "@/Service/makeName"
import useColumnzzStore from "@/Store/useColumnzzStore"
import useFilezzStore from "@/Store/useFilezzStore"
import useFlowPageStore, { StepEnum } from "@/Store/useFlowPageStore"
import useRequestzzStore from "@/Store/useRequestzzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import useWuColumnzzStore from "@/Store/useWuColumnzzStore"
import useWuzzStore from "@/Store/useWuzzStore"
import { useState, useEffect } from "react"
import FileButton from "../Button/FileButton"
import ParameterList from "../Oapi/ParameterList"
import WuColumnList from "../Wu/WuColumnList"

const Step = StepEnum.Request

interface Property {
    action: string
    entity: LB.Entity
    ma: LB.ModuleAction
    step: string
}

export default function ActionRequest(property: Property) {
    const sColumnzzStore = useColumnzzStore()
    const sFilezzStore = useFilezzStore()
    const sFlowPageStore = useFlowPageStore()
    const sRequestzzStore = useRequestzzStore()
    const sToastzzStore = useToastzzStore()
    const sWuColumnzzStore = useWuColumnzzStore()
    const sWuzzStore = useWuzzStore()

    const [wu, setWu] = useState<LB.Wu>()

    const nameRequest = makeRequestName(property.action, property.entity)
    const nameWu = makeWuName(property.action, property.entity, true)
    const file = makeFile()

    useEffect(() => {
        const request = sRequestzzStore.find(property.ma.requestId)
        if (request === undefined) {
            setWu(undefined)
            return
        }

        if (request.tf.type === OapiType.Wu) {
            setWu(sWuzzStore.find(request.tf.targetId))
        } else {
            setWu(undefined)
        }
    }, [property.ma.requestId])

    if (property.step === Step) {
        // ok
    } else {
        function makeList() {
            if (wu === undefined) {
                return null
            }

            const cicm = new Map(
                sColumnzzStore.itemzz
                    .filter((item) => item.entityId === wu.entityId)
                    .map((item) => [item.id, item]),
            )
            return sWuColumnzzStore.itemzz
                .filter((item) => item.wuId === wu.id)
                .map((item) => (
                    <tr key={item.id}>
                        <td className="w111">{cicm.get(item.columnId)?.name}</td>
                        <td>{cicm.get(item.columnId)?.type}</td>
                    </tr>
                ))
        }
        return (
            <table className="table table-borderless table-sm">
                <caption>
                    <h3
                        className="pointer hover-blue"
                        onClick={() => sFlowPageStore.setStep(Step)}
                    >
                        {Step}
                    </h3>
                    {makeButton()}
                </caption>
                <tbody>{makeList()}</tbody>
            </table>
        )
    }

    function makeButton() {
        if (sRequestzzStore.findByName(nameRequest)) {
            if (file === undefined) {
                return (
                    <span className="text-danger">
                        File {LayerEnum.Request} not found
                    </span>
                )
            }

            return (
                <FileButton
                    action={property.action}
                    file={file}
                    fullName
                    ma={property.ma}
                    entity={property.entity}
                ></FileButton>
            )
        }

        return (
            <span onClick={makeRequestWu} className="btn btn-outline-primary">
                + {nameRequest}
            </span>
        )
    }

    function makeFile() {
        const file = sFilezzStore.itemzz.find((item) => item.name === LayerEnum.Request)
        if (file === undefined) {
            return undefined
        }

        return cloneFile(file, property.ma.directoryId)
    }

    function makeRequestWu() {
        return makeActionWu(property.action, property.entity, true, sWuzzStore)
            .then((wu) => {
                setWu(wu)
                return makeRequestCRUD().create(makeRequest(nameRequest, wu.id))
            })
            .then((response) => {
                return makeModuleActionCRUD().update({
                    ...property.ma,
                    requestId: response.id,
                })
            })
            .then(() => sToastzzStore.showSuccess(`${nameRequest} created`))
            .catch(sToastzzStore.showError)
    }

    return (
        <div>
            <h3>{Step}</h3>
            <div>{makeButton()}</div>

            <h3 className="my-3">{nameWu}</h3>
            {wu === undefined ? null : (
                <WuColumnList item={wu} noCaption></WuColumnList>
            )}

            <h3>Parameter</h3>
            <ParameterList requestId={property.ma.requestId}></ParameterList>
        </div>
    )
}
