import { makeModuleCRUD } from "@/Database/makeCRUD"
import useDirectoryModalStore from "@/Store/useDirectoryModalStore"
import useDirectoryzzStore from "@/Store/useDirectoryzzStore"
import useFilezzStore from "@/Store/useFilezzStore"
import useFlowPageStore from "@/Store/useFlowPageStore"
import useToastzzStore from "@/Store/useToastzzStore"
import { ReactElement } from "react"
import SelectButton from "../Button/SelectButton"
import showInput from "../Dialog/showInput"

interface Property {
    children?: ReactElement
    item: LB.Module
    entity: LB.Entity // required for parsing directory name
}

export default function ModuleDetail(property: Property) {
    const sDirectoryModal = useDirectoryModalStore()
    const sDirectoryzzStore = useDirectoryzzStore()
    const sFilezzStore = useFilezzStore()
    const sFlowPageStore = useFlowPageStore()
    const sToastzzStore = useToastzzStore()

    const directory = sDirectoryzzStore.find(property.item.directoryId)
    const testDirectory = sDirectoryzzStore.find(property.item.testDirectoryId)

    function select(isTest: boolean) {
        sDirectoryModal.openCB("Please select a Directory", function (itemId) {
            const data = {
                ...property.item,
            }
            if (isTest) {
                data.testDirectoryId = itemId
            } else {
                data.directoryId = itemId
            }
            update(data)
        })
    }

    function update(item: LB.Module) {
        makeModuleCRUD()
            .update(item)
            .then((item) => sFlowPageStore.setModule(item))
            .catch(sToastzzStore.showError)
    }

    return (
        <table className="table td0-tar">
            <caption>{property.children}</caption>
            <tbody>
                <tr>
                    <td className="w111">URI prefix</td>
                    <td>
                        <button
                            className="btn btn-outline-primary"
                            type="button"
                            onClick={function () {
                                showInput(
                                    "Please input the Module name",
                                    property.item.prefix,
                                )
                                    .then(function (result) {
                                        if (result.isConfirmed) {
                                            return update({
                                                ...property.item,
                                                prefix: result.value,
                                            })
                                        }
                                    })
                                    .catch(sToastzzStore.showError)
                            }}
                        >
                            {property.item.prefix}
                        </button>
                    </td>
                </tr>
                <tr>
                    <td>directory</td>
                    <td>
                        <button
                            className={
                                "btn btn-outline-" + (directory ? "primary" : "danger")
                            }
                            type="button"
                            onClick={function () {
                                select(false)
                            }}
                        >
                            {directory
                                ? sDirectoryzzStore.treeHelper.getDirectoryFullName(
                                      directory,
                                      property.entity,
                                      "",
                                  )
                                : `Directory ${property.item.directoryId} not found`}
                        </button>
                    </td>
                </tr>
                <tr>
                    <td>test directory</td>
                    <td>
                        <button
                            className={
                                "btn btn-outline-" +
                                (testDirectory ? "primary" : "danger")
                            }
                            type="button"
                            onClick={function () {
                                select(true)
                            }}
                        >
                            {testDirectory
                                ? sDirectoryzzStore.treeHelper.getDirectoryFullName(
                                      testDirectory,
                                      property.entity,
                                      "",
                                  )
                                : `Directory ${property.item.testDirectoryId} not found`}
                        </button>
                    </td>
                </tr>
                <tr>
                    <td>route file</td>
                    <td>
                        <SelectButton
                            className="wa"
                            itemzz={sFilezzStore.itemzz}
                            value={property.item.fileId}
                            change={function (fileId) {
                                update({ ...property.item, fileId })
                            }}
                        ></SelectButton>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
