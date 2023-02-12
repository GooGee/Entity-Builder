import { cloneFile } from "@/Database/Factory/makeFile"
import makeModuleActionResponse from "@/Database/Factory/makeModuleActionResponse"
import makeResponse from "@/Database/Factory/makeResponse"
import makeTypeFormat from "@/Database/Factory/makeTypeFormat"
import { findOrMakeWu } from "@/Database/Factory/makeWu"
import {
    makeResponseCRUD,
    makeTypeFormatCRUD,
    makeModuleActionResponseCRUD,
} from "@/Database/makeCRUD"
import createTypeFormatArgumentzz from "@/Factory/createTypeFormatArgumentzz"
import LayerEnum from "@/Model/LayerEnum"
import { OapiType } from "@/Model/Oapi"
import getCollectionItemzz from "@/Service/getCollectionItemzz"
import { makeResponseName } from "@/Service/makeName"
import useFilezzStore from "@/Store/useFilezzStore"
import useFlowPageStore, { StepEnum } from "@/Store/useFlowPageStore"
import useResponsezzStore from "@/Store/useResponsezzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import useWuzzStore from "@/Store/useWuzzStore"
import { useState, useEffect } from "react"
import FileButton from "../Button/FileButton"
import SelectButton from "../Button/SelectButton"
import ActionResponse from "./ActionResponse"
import ResponseColumnList from "./ResponseColumnList"

const Step = StepEnum.Response

interface Property {
    action: string
    entity: LB.Entity
    ma: LB.ModuleAction
    module: LB.Module
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

    let unmounted = false

    useEffect(() => {
        refresh().catch(sToastzzStore.showError)
        return function () {
            unmounted = true
        }
    }, [property.ma, property.entity])

    const r200 = itemzz.find((item) => item.status === "200")
    const wu = sWuzzStore.findByName(property.entity.name)

    if (property.step === Step) {
        // ok
    } else {
        return (
            <>
                <table className="table table-borderless table-sm">
                    <caption>
                        <h3
                            className="pointer hover-blue"
                            onClick={() => sFlowPageStore.setStep(Step)}
                        >
                            {Step}
                        </h3>
                    </caption>
                    <tbody>
                        {r200 === undefined ? (
                            <tr>
                                <td colSpan={2}>
                                    <div className="text-danger">
                                        Response 200 is missing
                                    </div>
                                </td>
                            </tr>
                        ) : null}

                        {itemzz.map((item) => (
                            <tr key={item.status}>
                                <td className="w111">{item.status}</td>
                                <td>{sResponsezzStore.find(item.responseId)?.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <ResponseColumnList
                    empty={r200 === undefined}
                    wu={wu}
                ></ResponseColumnList>
            </>
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
            (item) =>
                item.directoryId === property.module.directoryId &&
                item.layer === LayerEnum.Response,
        )
        if (file === undefined) {
            return undefined
        }

        return cloneFile(file, property.ma.directoryId)
    }

    function makeResponseWu() {
        return makeResponseCRUD()
            .create(makeResponse(nameResponse))
            .then((lbr) => {
                sToastzzStore.showSuccess(`Response ${lbr.name} created`)
                const wrapperId =
                    (property.action === "ReadMany"
                        ? sWuzzStore.findByName("ApiList")?.id
                        : sWuzzStore.findByName("ApiItem")?.id) ?? 1
                const data = makeTypeFormat(OapiType.Wu, wrapperId)
                data.ownerResponseId = lbr.id
                return makeTypeFormatCRUD()
                    .create(data)
                    .then(function (tf) {
                        return createTypeFormatArgumentzz(wrapperId, tf.id).then(
                            function (tfzz) {
                                if (tfzz.length === 0) {
                                    return
                                }
                                return findOrMakeWu(
                                    property.entity.name,
                                    property.entity,
                                    false,
                                    sWuzzStore,
                                )
                                    .then((wu) =>
                                        makeTypeFormatCRUD().update({
                                            ...tfzz[0],
                                            wuId: wu.id,
                                        }),
                                    )
                                    .then(() =>
                                        sToastzzStore.showSuccess(
                                            `Wu ${property.entity.name} created`,
                                        ),
                                    )
                            },
                        )
                    })
                    .then(function () {
                        if (r200 === undefined) {
                            return makeModuleActionResponseCRUD().create(
                                makeModuleActionResponse("200", property.ma.id, lbr.id),
                            )
                        }
                        return makeModuleActionResponseCRUD().update({
                            ...r200,
                            responseId: lbr.id,
                        })
                    })
            })
            .then(refresh)
            .catch(sToastzzStore.showError)
    }

    function refresh() {
        return makeModuleActionResponseCRUD()
            .findAll()
            .then((response) => {
                if (unmounted) {
                    return
                }
                const itemzz = response.filter(
                    (item) => item.moduleActionId === property.ma.id,
                )
                setItemzz(itemzz)
            })
    }

    return (
        <>
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

            <ResponseColumnList empty={r200 === undefined} wu={wu}></ResponseColumnList>
        </>
    )
}
