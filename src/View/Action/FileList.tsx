import { cloneFile } from "@/Database/Factory/makeFile"
import { makeModuleActionFileCRUD, makeModuleActionCRUD } from "@/Database/makeCRUD"
import Constant from "@/Model/Constant"
import {
    getFileFullNameInCode,
    getCodeFileName,
    ScriptExtention,
    TemplateExtention,
} from "@/Model/FileManager"
import LayerEnum from "@/Model/LayerEnum"
import useDirectoryModalStore from "@/Store/useDirectoryModalStore"
import useDirectoryzzStore from "@/Store/useDirectoryzzStore"
import useFilezzStore from "@/Store/useFilezzStore"
import useModuleActionFilezzStore from "@/Store/useModuleActionFilezzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import { useState, useEffect } from "react"
import EditButton from "../Button/EditButton"
import FileButton from "../Button/FileButton"
import SelectButton from "../Button/SelectButton"
import showConfirm from "../Dialog/showConfirm"

interface Property {
    action: string
    directoryId: number
    isTest: boolean
    item: LB.ModuleAction
    module: LB.Module
    schema: LB.Schema
}

export default function FileList(property: Property) {
    const sDirectoryModal = useDirectoryModalStore()
    const sDirectoryzzStore = useDirectoryzzStore()
    const sFilezzStore = useFilezzStore()
    const sModuleActionFilezzStore = useModuleActionFilezzStore()
    const sToastzzStore = useToastzzStore()

    const directory = sDirectoryzzStore.find(property.directoryId)
    const [filezz, setFilezz] = useState<LB.File[]>([])

    useEffect(() => {
        const mafizz = sModuleActionFilezzStore.itemzz
            .filter(
                (item) =>
                    item.moduleActionId === property.item.id &&
                    item.directoryId === property.directoryId,
            )
            .map((item) => item.fileId)
        const set = new Set(mafizz)
        setFilezz(sFilezzStore.itemzz.filter((item) => set.has(item.id)))
    }, [property.directoryId, property.item, sModuleActionFilezzStore.itemzz])

    const excludezz = new Set([
        "",
        LayerEnum.Entity,
        LayerEnum.Factory,
        LayerEnum.Model,
        LayerEnum.Repository,
        LayerEnum.Test,
    ])
    const itemzz = sFilezzStore.itemzz
        .filter((item) => {
            if (property.isTest) {
                return item.layer === LayerEnum.Test
            }
            return !excludezz.has(item.layer)
        })
        .sort((aa, bb) => {
            if (aa.directoryId === bb.directoryId) {
                return aa.name.localeCompare(bb.name)
            }
            return aa.directoryId - bb.directoryId
        })

    function remove(id: number) {
        const found = sModuleActionFilezzStore.itemzz.find(
            (item) => item.fileId === id && item.moduleActionId === property.item.id,
        )
        if (found) {
            return makeModuleActionFileCRUD().delete(found.id)
        }
    }

    function makeView() {
        if (directory === undefined) {
            return null
        }

        return filezz.map((item) => {
            const file = cloneFile(item, property.directoryId)
            return (
                <tr key={item.id}>
                    <td>
                        <div className="btn-group me-2">
                            <span
                                onClick={() => {
                                    showConfirm()
                                        .then((response) => {
                                            if (response.isConfirmed) {
                                                return remove(item.id)
                                            }
                                        })
                                        .catch(sToastzzStore.showError)
                                }}
                                className="btn btn-outline-primary danger"
                            >
                                -
                            </span>
                            <EditButton
                                file={getFileFullNameInCode(
                                    getCodeFileName(item, ScriptExtention),
                                )}
                                content={Constant.ScriptCode}
                            ></EditButton>
                            <EditButton
                                file={getFileFullNameInCode(
                                    getCodeFileName(item, TemplateExtention),
                                )}
                                content=""
                            ></EditButton>
                        </div>
                        {item.name}
                    </td>
                    <td>
                        <FileButton
                            action={property.action}
                            file={file}
                            ma={property.item}
                            module={property.module}
                            schema={property.schema}
                        ></FileButton>
                    </td>
                </tr>
            )
        })
    }

    return (
        <table className="table">
            <caption>
                <h3 className="inline">File</h3>
                <span
                    className={
                        "mx-3 btn btn-outline-" + (directory ? "primary" : "danger")
                    }
                    onClick={function () {
                        sDirectoryModal.openCB(
                            "Please select a Directory",
                            function (directoryId) {
                                const data = {
                                    ...property.item,
                                }
                                if (property.isTest) {
                                    data.testDirectoryId = directoryId
                                } else {
                                    data.directoryId = directoryId
                                }
                                makeModuleActionCRUD()
                                    .update(data)
                                    .catch(sToastzzStore.showError)
                            },
                        )
                    }}
                >
                    {directory
                        ? sDirectoryzzStore.treeHelper.getDirectoryFullName(
                              directory,
                              property.schema,
                              property.action,
                          )
                        : `Directory ${property.directoryId} not found`}
                </span>
                <SelectButton
                    className="inline wa"
                    isAdd
                    itemzz={itemzz}
                    value={0}
                    change={function (fileId) {
                        makeModuleActionFileCRUD()
                            .create({
                                fileId,
                                moduleActionId: property.item.id,
                                directoryId: property.directoryId,
                            })
                            .catch(sToastzzStore.showError)
                    }}
                ></SelectButton>
            </caption>
            <thead>
                <tr>
                    <td>edit script / template</td>
                    <td>file</td>
                </tr>
            </thead>
            <tbody>{makeView()}</tbody>
        </table>
    )
}
