import { cloneFile } from "@/Database/Factory/makeFile"
import { makeModuleActionFileCRUD } from "@/Database/makeCRUD"
import Constant from "@/Model/Constant"
import {
    getFileFullNameInCode,
    getCodeFileName,
    ScriptExtention,
    TemplateExtention,
} from "@/Model/FileManager"
import useModuleActionFilezzStore from "@/Store/useModuleActionFilezzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import EditButton from "../Button/EditButton"
import FileButton from "../Button/FileButton"

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
    const sModuleActionFilezzStore = useModuleActionFilezzStore()
    const sToastzzStore = useToastzzStore()

    const fimafim = new Map(
        sModuleActionFilezzStore.itemzz
            .filter(
                (item) =>
                    item.moduleActionId === property.ma.id &&
                    item.directoryId === property.directoryId,
            )
            .map((item) => [item.fileId, item.id]),
    )

    return (
        <tbody>
            {property.source.map((item) => {
                let file = null
                if (fimafim.has(item.id)) {
                    file = cloneFile(item, property.directoryId)
                }
                return (
                    <tr key={item.id}>
                        <td>
                            <div className="btn-group me-2">
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
                            {file === null ? (
                                <button
                                    className="btn btn-outline-primary"
                                    type="button"
                                    onClick={function () {
                                        makeModuleActionFileCRUD()
                                            .create({
                                                fileId: item.id,
                                                moduleActionId: property.ma.id,
                                                directoryId: property.directoryId,
                                            })
                                            .catch(sToastzzStore.showError)
                                    }}
                                >
                                    +
                                </button>
                            ) : (
                                <div>
                                    <button
                                        onClick={function () {
                                            const found = fimafim.get(item.id)
                                            if (found) {
                                                return makeModuleActionFileCRUD()
                                                    .delete(found)
                                                    .catch(sToastzzStore.showError)
                                            }
                                        }}
                                        className="btn btn-outline-danger"
                                        type="button"
                                    >
                                        -
                                    </button>
                                    <FileButton
                                        action={property.action}
                                        className="ms-3"
                                        file={file}
                                        ma={property.ma}
                                        module={property.module}
                                        entity={property.entity}
                                    ></FileButton>
                                </div>
                            )}
                        </td>
                    </tr>
                )
            })}
        </tbody>
    )
}
