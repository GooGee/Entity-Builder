import { makeModuleActionCRUD } from "@/Database/makeCRUD"
import { makeIdItemMap } from "@/Factory/makeMap"
import Constant from "@/Model/Constant"
import { getFileFullNameInCode, getCodeFileName, ScriptExtention, TemplateExtention } from "@/Model/FileManager"
import useFilezzStore from "@/Store/useFilezzStore"
import useFlowPageStore from "@/Store/useFlowPageStore"
import useListModalStore from "@/Store/useListModalStore"
import useToastzzStore from "@/Store/useToastzzStore"
import EditButton from "../Button/EditButton"
import FileButton from "../Button/FileButton"
import showInput from "../Dialog/showInput"

interface Property {
    action: string
    directoryId: number
    source: LB.File[]
    isTest: boolean
    ma: LB.ModuleAction
    module: LB.Module
    entity: LB.Entity
}

export default function FileList(property: Property) {
    const sFilezzStore = useFilezzStore()
    const sFlowPageStore = useFlowPageStore()
    const sListModalStore = useListModalStore()
    const sToastzzStore = useToastzzStore()

    const map = makeIdItemMap(property.ma.filezz)

    const xFilezz = property.ma.filezz.filter((item) => item.isExtra && item.directoryId === property.directoryId)

    function makeButton(item: LB.ModuleActionFile) {
        return (
            <>
                <button
                    onClick={function () {
                        makeModuleActionCRUD()
                            .update({
                                ...property.ma,
                                filezz: property.ma.filezz.filter((one) => one.id !== item.id),
                            })
                            .then((item) => sFlowPageStore.setAction(item.name, item))
                            .catch(sToastzzStore.showError)
                    }}
                    className="btn btn-outline-danger"
                    type="button"
                >
                    -
                </button>
                <FileButton
                    action={property.action}
                    className="ms-3"
                    entity={property.entity}
                    file={item}
                    ma={property.ma}
                    module={property.module}
                ></FileButton>
            </>
        )
    }

    function selectFile() {
        if (sListModalStore.text === "") {
            sListModalStore.text = property.action
        }
        const namezz = sFilezzStore.itemzz.filter((item) => item.isSingle === false).map((item) => item.name)
        sListModalStore.openCB("select a file", namezz, function (name) {
            const item = sFilezzStore.findByName(name)
            if (item === undefined) {
                return
            }
            showInput("please input the fileNamePattern", item.fileNamePattern)
                .then(function (result) {
                    if (result.isConfirmed) {
                        if (result.value) {
                            const file = {
                                ...item,
                                directoryId: property.directoryId,
                                isExtra: true,
                                fileNamePattern: result.value,
                                id: item.id,
                            } as LB.ModuleActionFile
                            if (property.isTest) {
                                file.nameSpacePattern = property.entity.name
                            } else {
                                file.nameSpacePattern = property.ma.name
                            }
                            return makeModuleActionCRUD()
                                .update({
                                    ...property.ma,
                                    filezz: [...property.ma.filezz, file],
                                })
                                .then((item) => sFlowPageStore.setAction(item.name, item))
                        }
                    }
                })
                .catch(sToastzzStore.showError)
        })
    }

    return (
        <tbody>
            {property.source.map((item) => {
                const file = map.get(item.id)
                return (
                    <tr key={item.id}>
                        <td>
                            <div className="btn-group me-2">
                                <EditButton
                                    file={getFileFullNameInCode(getCodeFileName(item, ScriptExtention))}
                                    content={Constant.ScriptCode}
                                ></EditButton>
                                <EditButton
                                    file={getFileFullNameInCode(getCodeFileName(item, TemplateExtention))}
                                    content=""
                                ></EditButton>
                            </div>
                            {item.name}
                        </td>
                        <td>
                            {file === undefined ? (
                                <button
                                    className="btn btn-outline-primary"
                                    type="button"
                                    onClick={function () {
                                        const file = {
                                            ...item,
                                            isExtra: false,
                                            directoryId: property.directoryId,
                                        } as LB.ModuleActionFile
                                        if (property.isTest === false) {
                                            file.nameSpacePattern = property.ma.name
                                        }
                                        makeModuleActionCRUD()
                                            .update({
                                                ...property.ma,
                                                filezz: [...property.ma.filezz, file],
                                            })
                                            .then((item) => sFlowPageStore.setAction(item.name, item))
                                            .catch(sToastzzStore.showError)
                                    }}
                                >
                                    +
                                </button>
                            ) : (
                                makeButton(file)
                            )}
                        </td>
                    </tr>
                )
            })}

            {xFilezz.map(function (item) {
                return (
                    <tr key={item.id}>
                        <td></td>
                        <td>{makeButton(item)}</td>
                    </tr>
                )
            })}

            <tr>
                <td></td>
                <td>
                    <button className="btn btn-outline-success" type="button" onClick={selectFile}>
                        +
                    </button>
                </td>
            </tr>
        </tbody>
    )
}
