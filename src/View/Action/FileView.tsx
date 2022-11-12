import { makeModuleActionCRUD } from "@/Database/makeCRUD"
import LayerEnum from "@/Model/LayerEnum"
import useDirectoryModalStore from "@/Store/useDirectoryModalStore"
import useDirectoryzzStore from "@/Store/useDirectoryzzStore"
import useFilezzStore from "@/Store/useFilezzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import FileList from "./FileList"

interface Property {
    action: string
    directoryId: number
    isTest: boolean
    ma: LB.ModuleAction
    module: LB.Module
    schema: LB.Schema
}

export default function FileView(property: Property) {
    const sDirectoryModal = useDirectoryModalStore()
    const sDirectoryzzStore = useDirectoryzzStore()
    const sFilezzStore = useFilezzStore()
    const sToastzzStore = useToastzzStore()

    const directory = sDirectoryzzStore.find(property.directoryId)

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

    return (
        <table className="table">
            <caption>
                <h3 className="inline">File</h3>
                <span
                    className={
                        "ms-3 btn btn-outline-" + (directory ? "primary" : "danger")
                    }
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
                              property.schema,
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
                isTest={property.isTest}
                ma={property.ma}
                module={property.module}
                schema={property.schema}
                source={itemzz}
            ></FileList>
        </table>
    )
}
