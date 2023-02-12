import { makeModuleActionCRUD } from "@/Database/makeCRUD"
import useDirectoryModalStore from "@/Store/useDirectoryModalStore"
import useDirectoryzzStore from "@/Store/useDirectoryzzStore"
import useFilezzStore from "@/Store/useFilezzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import FileList from "./FileList"

interface Property {
    action: string
    directoryId: number
    entity: LB.Entity
    isTest: boolean
    ma: LB.ModuleAction
    module: LB.Module
}

export default function FileView(property: Property) {
    const sDirectoryModal = useDirectoryModalStore()
    const sDirectoryzzStore = useDirectoryzzStore()
    const sFilezzStore = useFilezzStore()
    const sToastzzStore = useToastzzStore()

    const directory = sDirectoryzzStore.find(property.directoryId)

    const itemzz = sFilezzStore.itemzz
        .filter((item) => {
            if (property.isTest) {
                return item.directoryId === property.module.testDirectoryId
            }
            return (
                item.directoryId === property.ma.directoryId ||
                item.directoryId === property.module.directoryId
            )
        })
        .sort((aa, bb) => {
            if (aa.directoryId === bb.directoryId) {
                return aa.name.localeCompare(bb.name)
            }
            return aa.directoryId - bb.directoryId
        })

    return (
        <table className="table">
            <caption>
                <span className="me-3">Directory:</span>
                <span
                    className={"btn btn-outline-" + (directory ? "primary" : "danger")}
                    onClick={function () {
                        sDirectoryModal.openCB(
                            "Please select a Directory",
                            function (directoryId) {
                                const data = {
                                    ...property.ma,
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
                              property.entity,
                              property.action,
                          )
                        : `Directory ${property.directoryId} not found`}
                </span>
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
