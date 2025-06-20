import useDirectoryzzStore from "@/Store/useDirectoryzzStore"
import useFilezzStore from "@/Store/useFilezzStore"
import FileList from "./FileList"

interface Property {
    action: string
    directoryId: number
    entity: LB.Entity
    isTest: boolean
    ma: LB.ModuleAction
    module: LB.Module
    directoryMap: Map<number, LB.Directory>
}

export default function FileView(property: Property) {
    const sDirectoryzzStore = useDirectoryzzStore()

    const directory = sDirectoryzzStore.find(property.directoryId)

    return (
        <table className="table">
            <caption>
                <span className="me-3">Directory:</span>
                {directory
                    ? sDirectoryzzStore.treeHelper.getDirectoryFullName(directory, property.entity, property.action)
                    : `Directory ${property.directoryId} not found`}
                {property.isTest ? "/" + property.entity.name : ""}
            </caption>
            <thead>
                <tr>
                    <td className="w-50">edit script / template</td>
                    <td>file</td>
                </tr>
            </thead>
            <FileList
                action={property.action}
                directoryId={property.directoryId}
                entity={property.entity}
                isTest={property.isTest}
                ma={property.ma}
                module={property.module}
            ></FileList>
        </table>
    )
}
