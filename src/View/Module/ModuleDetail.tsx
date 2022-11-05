import { makeModuleCRUD } from "@/Database/makeCRUD"
import useDirectoryModalStore from "@/Store/useDirectoryModalStore"
import useDirectoryzzStore from "@/Store/useDirectoryzzStore"
import useModulePageStore from "@/Store/useModulePageStore"
import useToastzzStore from "@/Store/useToastzzStore"

interface Property {
    item: LB.Module
    schema: LB.Schema // required for parsing directory name
}

export default function ModuleDetail(property: Property) {
    const sDirectoryModal = useDirectoryModalStore()
    const sDirectoryzzStore = useDirectoryzzStore()
    const sModulePageStore = useModulePageStore()
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
        sModulePageStore.setItem(item)
        makeModuleCRUD()
            .update(item)
            .then((response) => sModulePageStore.setItem(response))
            .catch(sToastzzStore.showError)
    }

    return (
        <table className="table table-text-right">
            <tbody>
                <tr>
                    <td className="w222">URI prefix</td>
                    <td>
                        <input
                            value={property.item.prefix}
                            onChange={(event) =>
                                update({
                                    ...property.item!,
                                    prefix: event.target.value,
                                })
                            }
                            className="form-control"
                            type="text"
                        />
                    </td>
                </tr>
                <tr>
                    <td>directory</td>
                    <td>
                        <button
                            className={
                                "mx-3 btn btn-outline-" +
                                (directory ? "primary" : "danger")
                            }
                            type="button"
                            onClick={function () {
                                select(false)
                            }}
                        >
                            {directory
                                ? sDirectoryzzStore.treeHelper.getDirectoryFullName(
                                      directory,
                                      property.schema,
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
                                "mx-3 btn btn-outline-" +
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
                                      property.schema,
                                      "",
                                  )
                                : `Directory ${property.item.testDirectoryId} not found`}
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
