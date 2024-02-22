import Constant from "@/Model/Constant"
import { getFileFullNameInCode, getCodeFileName, ScriptExtention, TemplateExtention } from "@/Model/FileManager"
import useDirectoryzzStore from "@/Store/useDirectoryzzStore"
import EditButton from "../Button/EditButton"
import FileButton from "../Button/FileButton"

interface Property {
    entity: LB.Entity
    item: LB.File
    ma?: LB.ModuleAction
    module?: LB.Module
}

export default function FileItem(property: Property) {
    const sDirectoryzzStore = useDirectoryzzStore()

    function getName(item: LB.File) {
        const name = sDirectoryzzStore.treeHelper.getFileFullName(item, property.entity, "")
        const index = name.lastIndexOf("/")
        if (index === -1) {
            return "/"
        }

        return name.slice(0, index)
    }

    return (
        <tr>
            <td>
                <div className="btn-group me-2">
                    <EditButton
                        file={getFileFullNameInCode(getCodeFileName(property.item, ScriptExtention))}
                        content={Constant.ScriptCode}
                    ></EditButton>
                    <EditButton
                        file={getFileFullNameInCode(getCodeFileName(property.item, TemplateExtention))}
                        content=""
                    ></EditButton>
                </div>
                {property.item.name}
            </td>
            <td>
                <div>{getName(property.item)}</div>
                <FileButton
                    action=""
                    file={property.item}
                    entity={property.entity}
                    ma={property.ma}
                    module={property.module}
                ></FileButton>
            </td>
        </tr>
    )
}
