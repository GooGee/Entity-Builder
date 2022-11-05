import makeModuleAction from "@/Database/Factory/makeModuleAction"
import { makeModuleActionCRUD } from "@/Database/makeCRUD"
import getCollectionItemzz from "@/Service/getCollectionItemzz"
import useDirectoryzzStore from "@/Store/useDirectoryzzStore"
import useModuleActionzzStore from "@/Store/useModuleActionzzStore"
import useSchemaPageStore from "@/Store/useSchemaPageStore"
import useToastzzStore from "@/Store/useToastzzStore"
import Action from "./Action"

interface Property {
    module: LB.Module
    schema: LB.Schema
}

export default function ActionList(property: Property) {
    const sDirectoryzzStore = useDirectoryzzStore()
    const sModuleActionzzStore = useModuleActionzzStore()
    const sSchemaPageStore = useSchemaPageStore()
    const sToastzzStore = useToastzzStore()

    const tabzz = getCollectionItemzz("ModuleAction")
    const tab = tabzz.find((item) => item.name === sSchemaPageStore.actionTab)
    const action = tab === undefined ? undefined : find(tab.id)

    function find(cii: number) {
        return sModuleActionzzStore.itemzz.find(
            (item) =>
                item.schemaId === property.schema.id &&
                item.moduleId === property.module.id &&
                item.collectionItemId === cii,
        )
    }

    function getCN(cii: number) {
        let cn = "nav-link"
        if (tab) {
            if (cii === tab.id) {
                cn += " active"
                return cn
            }
        }

        if (find(cii) === undefined) {
            cn += " text-secondary"
        }
        return cn
    }

    return (
        <div>
            <ul className="nav nav-tabs mb-3">
                {tabzz.map((item) => (
                    <li
                        key={item.id}
                        onClick={function () {
                            sSchemaPageStore.setActionTab(item.name)
                        }}
                        className="nav-item nav-item-fill"
                    >
                        <span className={getCN(item.id)}>{item.name}</span>
                    </li>
                ))}
            </ul>

            {action ? (
                <Action
                    item={action}
                    name={
                        tabzz.find((item) => item.id === action.collectionItemId)
                            ?.name ?? "-- not found --"
                    }
                    module={property.module}
                    schema={property.schema}
                ></Action>
            ) : tab === undefined ? null : (
                <span
                    onClick={function () {
                        let directoryId = parseInt(tab.tag)
                        if (isNaN(directoryId)) {
                            sToastzzStore.showDanger(
                                `ModuleAction ${tab.name} tag is not a directoryId` +
                                    "\nmake sure its a correct directory id in Collection ModuleAction",
                            )
                            return
                        }

                        const found = sDirectoryzzStore.itemzz.find(
                            (item) =>
                                item.parentId === property.module.directoryId &&
                                item.name === tab.name,
                        )
                        if (found) {
                            directoryId = found.id
                        }

                        makeModuleActionCRUD()
                            .create(
                                makeModuleAction(
                                    directoryId,
                                    property.module.testDirectoryId,
                                    property.schema,
                                    property.module,
                                    tab,
                                ),
                            )
                            .catch(sToastzzStore.showError)
                    }}
                    className="btn btn-outline-primary"
                >
                    +
                </span>
            )}
        </div>
    )
}
