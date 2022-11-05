import { cloneFile } from "@/Database/Factory/makeFile"
import makeRequest from "@/Database/Factory/makeRequest"
import { makeActionWu } from "@/Database/Factory/makeWu"
import { makeRequestCRUD } from "@/Database/makeCRUD"
import LayerEnum from "@/Model/LayerEnum"
import { OapiType } from "@/Model/Oapi"
import useFilezzStore from "@/Store/useFilezzStore"
import useRequestzzStore from "@/Store/useRequestzzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import useWuzzStore from "@/Store/useWuzzStore"
import { useState, useEffect } from "react"
import FileButton from "../Button/FileButton"
import SelectButton from "../Button/SelectButton"
import TypeFormat from "../Reference/TypeFormat"
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

    const name = property.action + property.schema.name + LayerEnum.Request
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
            .then((wu) => makeRequestCRUD().create(makeRequest(name, wu.id)))
            .then((response) =>
                property.update({
                    ...property.item,
                    requestId: response.id,
                }),
            )
            .then(() => sToastzzStore.showSuccess(`${name} created`))
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
        <table className="table">
            <caption>
                <h3 className="inline me-3">Request</h3>

                {sRequestzzStore.findByName(name) ? (
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
                        + {name}
                    </span>
                )}
            </caption>
            <thead>
                <tr>
                    <th>name</th>
                    <th>content</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>
                        <SelectButton
                            className="wa"
                            itemzz={sRequestzzStore.itemzz}
                            value={property.item.requestId}
                            change={function (requestId) {
                                property.update({
                                    ...property.item,
                                    requestId,
                                })
                            }}
                        ></SelectButton>
                    </td>
                    <td>
                        {request === undefined ? null : (
                            <TypeFormat
                                id={0}
                                item={request.tf}
                                update={function (tf) {
                                    update({ ...request, tf })
                                }}
                            ></TypeFormat>
                        )}
                    </td>
                </tr>
            </tbody>

            <tfoot>
                <tr>
                    <td colSpan={2}>
                        <h3 className="my-3">{name}</h3>
                        {wu === undefined ? null : (
                            <WuColumnList item={wu} noCaption></WuColumnList>
                        )}
                    </td>
                </tr>
            </tfoot>
        </table>
    )
}
