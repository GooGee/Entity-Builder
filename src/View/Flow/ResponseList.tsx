import { cloneFile } from "@/Database/Factory/makeFile"
import makeModuleActionResponse from "@/Database/Factory/makeModuleActionResponse"
import makeResponse from "@/Database/Factory/makeResponse"
import makeTypeFormat from "@/Database/Factory/makeTypeFormat"
import { findOrMakeWu } from "@/Database/Factory/makeWu"
import { makeModuleActionResponseCRUD, makeResponseCRUD } from "@/Database/makeCRUD"
import LayerEnum from "@/Model/LayerEnum"
import { OapiType } from "@/Model/Oapi"
import getCollectionItemzz from "@/Service/getCollectionItemzz"
import { makeResponseName } from "@/Service/makeName"
import useFilezzStore from "@/Store/useFilezzStore"
import useFlowPageStore, { StepEnum } from "@/Store/useFlowPageStore"
import useResponsezzStore from "@/Store/useResponsezzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import useWuzzStore from "@/Store/useWuzzStore"
import { useEffect, useState } from "react"
import FileButton from "../Button/FileButton"
import SelectButton from "../Button/SelectButton"
import ActionResponse from "./ActionResponse"

const Step = StepEnum.Response

interface Property {
    action: string
    entity: LB.Entity
    ma: LB.ModuleAction
    step: string
}

export default function ResponseList(property: Property) {
    const sFilezzStore = useFilezzStore()
    const sFlowPageStore = useFlowPageStore()
    const sResponsezzStore = useResponsezzStore()
    const sToastzzStore = useToastzzStore()
    const sWuzzStore = useWuzzStore()

    const [itemzz, setItemzz] = useState<LB.ModuleActionResponse[]>([])

    const nameResponse = makeResponseName(property.action, property.entity)
    const file = makeFile()

    const statuszz = getCollectionItemzz("HttpStatus")

    useEffect(() => {
        refresh().catch(sToastzzStore.showError)
    }, [property.ma, property.entity])

    if (property.step === Step) {
        // ok
    } else {
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
                <tbody>
                    {itemzz.map((item) => (
                        <tr key={item.status}>
                            <td className="w111">{item.status}</td>
                            <td>{sResponsezzStore.find(item.responseId)?.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }

    function makeButton() {
        if (sResponsezzStore.findByName(nameResponse)) {
            if (file === undefined) {
                return (
                    <span className="text-danger">
                        File {LayerEnum.Response} not found
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
            <span onClick={makeResponseWu} className="btn btn-outline-primary">
                + {nameResponse}
            </span>
        )
    }

    function makeFile() {
        const file = sFilezzStore.itemzz.find(
            (item) => item.name === LayerEnum.Response,
        )
        if (file === undefined) {
            return undefined
        }

        return cloneFile(file, property.ma.directoryId)
    }

    function makeResponseWu() {
        findOrMakeWu(property.entity.name, property.entity, false, sWuzzStore)
            .then(function (wu) {
                const wrapperId = property.action === "ReadMany" ? 6 : 5
                const item = makeResponse(nameResponse, wrapperId)

                item.tf.argumentzz.push(makeTypeFormat(OapiType.Wu, wu.id))
                return makeResponseCRUD()
                    .create(item)
                    .then((lbr) => {
                        const mar = itemzz.find((item) => item.status === "200")
                        if (mar === undefined) {
                            return makeModuleActionResponseCRUD().create(
                                makeModuleActionResponse("200", property.ma.id, lbr.id),
                            )
                        }
                        return makeModuleActionResponseCRUD().update({
                            ...mar,
                            responseId: lbr.id,
                        })
                    })
            })
            .then(refresh)
            .then(() => sToastzzStore.showSuccess(`${nameResponse} created`))
            .catch(sToastzzStore.showError)
    }

    function refresh() {
        return makeModuleActionResponseCRUD()
            .findAll()
            .then((response) => {
                const itemzz = response.filter(
                    (item) => item.moduleActionId === property.ma.id,
                )
                setItemzz(itemzz)
            })
    }

    return (
        <table className="table td0-tal">
            <caption>
                <h3 className="c-dark">{Step}</h3>
                {makeButton()}
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
                                            property.ma.id,
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
            </tfoot>
        </table>
    )
}
