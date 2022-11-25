import { cloneFile } from "@/Database/Factory/makeFile"
import makeRequest from "@/Database/Factory/makeRequest"
import { makeActionWu, makeWuName } from "@/Database/Factory/makeWu"
import { makeRequestCRUD } from "@/Database/makeCRUD"
import LayerEnum from "@/Model/LayerEnum"
import { OapiType } from "@/Model/Oapi"
import useFilezzStore from "@/Store/useFilezzStore"
import useRequestzzStore from "@/Store/useRequestzzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import useWuzzStore from "@/Store/useWuzzStore"
import { useState, useEffect } from "react"
import FileButton from "../Button/FileButton"
import RequestDetail from "../Oapi/RequestDetail"
import WuColumnList from "../Wu/WuColumnList"

interface Property {
    action: string
    item: LB.ModuleAction
    schema: LB.Schema
    update(data: LB.ModuleAction): void
}

export default function ActionRequest(property: Property) {
    const sFilezzStore = useFilezzStore()
    const sRequestzzStore = useRequestzzStore()
    const sToastzzStore = useToastzzStore()
    const sWuzzStore = useWuzzStore()

    const [request, setRequest] = useState(
        sRequestzzStore.find(property.item.requestId),
    )
    const [wu, setWu] = useState<LB.Wu>()

    const nameRequest = property.action + property.schema.name + LayerEnum.Request
    const nameWu = makeWuName(property.action, property.schema, true)
    const file = makeFile()

    useEffect(() => {
        const request = sRequestzzStore.find(property.item.requestId)
        setRequest(request)
        updateWu(request)
    }, [property.item.requestId])

    function makeFile() {
        const file = sFilezzStore.itemzz.find((item) => item.name === LayerEnum.Request)
        if (file === undefined) {
            return undefined
        }

        return cloneFile(file, property.item.directoryId)
    }

    function makeRequestWu() {
        return makeActionWu(property.action, property.schema, true, sWuzzStore)
            .then((wu) => makeRequestCRUD().create(makeRequest(nameRequest, wu.id)))
            .then((response) =>
                property.update({
                    ...property.item,
                    requestId: response.id,
                }),
            )
            .then(() => sToastzzStore.showSuccess(`${nameRequest} created`))
            .catch(sToastzzStore.showError)
    }

    function update(item: LB.Request) {
        setRequest(item)
        makeRequestCRUD()
            .update(item)
            .then((response) => {
                setRequest(response)
                updateWu(response)
            })
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
            <div>
                <h3 className="inline me-3">Request</h3>

                {sRequestzzStore.findByName(nameRequest) ? (
                    file === undefined ? (
                        <span className="text-danger">
                            File {LayerEnum.Request} not found
                        </span>
                    ) : (
                        <FileButton
                            action={property.action}
                            className="me-3"
                            file={file}
                            fullName
                            ma={property.item}
                            schema={property.schema}
                        ></FileButton>
                    )
                ) : (
                    <span onClick={makeRequestWu} className="btn btn-outline-primary">
                        + {nameRequest}
                    </span>
                )}
            </div>

            {request === undefined ? null : (
                <RequestDetail item={request} update={update}></RequestDetail>
            )}

            <h3 className="my-3">{nameWu}</h3>
            {wu === undefined ? null : (
                <WuColumnList item={wu} noCaption></WuColumnList>
            )}
        </div>
    )
}
