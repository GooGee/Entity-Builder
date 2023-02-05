import { cloneFile } from "@/Database/Factory/makeFile"
import makeRequest from "@/Database/Factory/makeRequest"
import { makeActionWu } from "@/Database/Factory/makeWu"
import { makeModuleActionCRUD, makeRequestCRUD } from "@/Database/makeCRUD"
import LayerEnum from "@/Model/LayerEnum"
import { OapiType } from "@/Model/Oapi"
import { makeRequestName, makeWuName } from "@/Service/makeName"
import useFilezzStore from "@/Store/useFilezzStore"
import useFlowPageStore, { StepEnum } from "@/Store/useFlowPageStore"
import useRequestzzStore from "@/Store/useRequestzzStore"
import useToastzzStore from "@/Store/useToastzzStore"
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
    const sFilezzStore = useFilezzStore()
    const sFlowPageStore = useFlowPageStore()
    const sRequestzzStore = useRequestzzStore()
    const sToastzzStore = useToastzzStore()
    const sWuzzStore = useWuzzStore()

    const [wu, setWu] = useState<LB.Wu>()

    const nameRequest = makeRequestName(property.action, property.entity)
    const nameWu = makeWuName(property.action, property.entity, true)
    const file = makeFile()

    useEffect(() => {
        const request = sRequestzzStore.find(property.ma.requestId)
        updateWu(request)
    }, [property.ma.requestId])

    if (property.step === Step) {
        // ok
    } else {
        return (
            <div>
                <h3
                    className="pointer hover-blue c-secondary"
                    onClick={() => sFlowPageStore.setStep(Step)}
                >
                    {Step}
                </h3>
                {makeButton()}
            </div>
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
                    className="me-3"
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

    function updateWu(request: LB.Request | undefined) {
        if (request === undefined) {
            setWu(undefined)
            return
        }

        if (request.tf.type === OapiType.Wu) {
            setWu(sWuzzStore.find(request.tf.targetId))
        } else {
            setWu(undefined)
        }
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
            <ParameterList
                inPath={false}
                inResponse={false}
                targetId={property.ma.id}
            ></ParameterList>
        </div>
    )
}
