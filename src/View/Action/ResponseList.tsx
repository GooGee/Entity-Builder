import { cloneFile } from "@/Database/Factory/makeFile"
import makeModuleActionResponse from "@/Database/Factory/makeModuleActionResponse"
import makeResponse from "@/Database/Factory/makeResponse"
import makeTypeFormat from "@/Database/Factory/makeTypeFormat"
import { makeActionWu } from "@/Database/Factory/makeWu"
import { makeModuleActionResponseCRUD, makeResponseCRUD } from "@/Database/makeCRUD"
import LayerEnum from "@/Model/LayerEnum"
import { OapiType } from "@/Model/Oapi"
import getCollectionItemzz from "@/Service/getCollectionItemzz"
import useFilezzStore from "@/Store/useFilezzStore"
import useResponsezzStore from "@/Store/useResponsezzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import useWuzzStore from "@/Store/useWuzzStore"
import { useEffect, useState } from "react"
import FileButton from "../Button/FileButton"
import SelectButton from "../Button/SelectButton"
import WuColumnList from "../Wu/WuColumnList"
import ActionResponse from "./ActionResponse"

interface Property {
    action: string
    item: LB.ModuleAction
    schema: LB.Schema
}

export default function ResponseList(property: Property) {
    const sFilezzStore = useFilezzStore()
    const sResponsezzStore = useResponsezzStore()
    const sToastzzStore = useToastzzStore()
    const sWuzzStore = useWuzzStore()

    const [itemzz, setItemzz] = useState<LB.ModuleActionResponse[]>([])
    const [wu, setWu] = useState<LB.Wu>()

    const name = property.action + property.schema.name + LayerEnum.Response
    const file = makeFile()

    const statuszz = getCollectionItemzz("HttpStatus")

    useEffect(() => {
        refresh().catch(sToastzzStore.showError)
    }, [property.item, property.schema])

    function makeFile() {
        const file = sFilezzStore.itemzz.find(
            (item) => item.name === LayerEnum.Response,
        )
        if (file === undefined) {
            return undefined
        }

        return cloneFile(file, property.item.directoryId)
    }

    function makeResponseWu() {
        return makeActionWu(property.action, property.schema, false, sWuzzStore)
            .then(function (wu) {
                let wrapperId = 1002
                if (property.action === "ReadMany") {
                    wrapperId = 1003
                }
                const item = makeResponse(name, wrapperId)
                item.tf.argumentzz.push(makeTypeFormat(OapiType.Wu, wu.id))
                return makeResponseCRUD().create(item)
            })
            .then((lbr) => {
                let mar = itemzz.find((item) => item.status === "200")
                if (mar === undefined) {
                    return makeModuleActionResponseCRUD().create(
                        makeModuleActionResponse("200", property.item.id, lbr.id),
                    )
                }
                return makeModuleActionResponseCRUD().update({
                    ...mar,
                    responseId: lbr.id,
                })
            })
            .then(refresh)
            .then(() => sToastzzStore.showSuccess(`${name} created`))
            .catch(sToastzzStore.showError)
    }

    function refresh() {
        return makeModuleActionResponseCRUD()
            .findAll()
            .then((response) => {
                const itemzz = response.filter(
                    (item) => item.moduleActionId === property.item.id,
                )
                setItemzz(itemzz)

                const name = "DTO_" + property.action + property.schema.name
                setWu(sWuzzStore.findByName(name))
            })
    }

    return (
        <>
            <table className="table">
                <caption>
                    <h3 className="inline me-3">Response</h3>

                    {sResponsezzStore.findByName(name) ? (
                        file === undefined ? (
                            <span className="text-danger">
                                File {LayerEnum.Response} not found
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
                        <span
                            onClick={makeResponseWu}
                            className="btn btn-outline-primary"
                        >
                            + {name}
                        </span>
                    )}
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
                                        .create(
                                            makeModuleActionResponse(
                                                item?.name ?? "",
                                                property.item.id,
                                            ),
                                        )
                                        .then(refresh)
                                        .catch(sToastzzStore.showError)
                                }}
                            ></SelectButton>
                        </td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <h3 className="my-3">{name}</h3>
                            {wu === undefined ? null : (
                                <WuColumnList item={wu} noCaption></WuColumnList>
                            )}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </>
    )
}
