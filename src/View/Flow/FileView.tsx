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
    const sFilezzStore = useFilezzStore()

    const directory = sDirectoryzzStore.find(property.directoryId)

    const itemzz = sFilezzStore.itemzz
        .filter((item) => {
            if (property.isTest) {
                return item.directoryId === property.module.testDirectoryId
            }
            return (
                item.directoryId === property.ma.directoryId ||
                findSimilarAction(property.ma.name, item.directoryId) ||
                item.directoryId === property.module.directoryId
            )
        })
        .sort((aa, bb) => {
            if (aa.directoryId === bb.directoryId) {
                return aa.name.localeCompare(bb.name)
            }
            return aa.directoryId - bb.directoryId
        })

    function findSimilarAction(name: string, directoryId: number) {
        const directory = property.directoryMap.get(directoryId)
        if (directory === undefined) {
            return false
        }

        const similar = name.includes(directory.name)
        if (similar) {
            return inModule(directory.parentId)
        }

        return false

        function inModule(directoryId: number | null): boolean {
            if (directoryId === null) {
                return false
            }
            if (directoryId === property.module.directoryId) {
                return true
            }

            const directory = property.directoryMap.get(directoryId)
            if (directory === undefined) {
                return false
            }
            return inModule(directory.parentId)
        }
    }

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
                source={itemzz}
            ></FileList>
        </table>
    )
}
