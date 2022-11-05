import makeModule from "@/Database/Factory/makeModule"
import useModulezzStore from "@/Store/useModulezzStore"
import useSchemaPageStore from "@/Store/useSchemaPageStore"
import ActionList from "../Action/ActionList"
import TabItemList from "../Part/TabItemList"
import SchemaSetting from "./SchemaSetting"

export default function SchemaView() {
    const sModulezzStore = useModulezzStore()
    const sSchemaPageStore = useSchemaPageStore()

    const tabzz = [...sModulezzStore.itemzz]
    const setting = makeModule("Setting") as LB.Module
    setting.id = 0
    tabzz.unshift(setting)

    if (sSchemaPageStore.item === undefined) {
        return null
    }

    function makeView() {
        if (sSchemaPageStore.item === undefined) {
            return null
        }

        if (sSchemaPageStore.tab === "Setting") {
            return <SchemaSetting schema={sSchemaPageStore.item}></SchemaSetting>
        }

        const module = tabzz.find((item) => item.name === sSchemaPageStore.tab)
        if (module === undefined) {
            return null
        }
        return <ActionList module={module} schema={sSchemaPageStore.item}></ActionList>
    }

    return (
        <div>
            <TabItemList
                tab={tabzz.find((item) => item.name === sSchemaPageStore.tab)}
                tabzz={tabzz}
                setTab={function (tab) {
                    sSchemaPageStore.setTab(tab.name)
                }}
            ></TabItemList>

            {makeView()}
        </div>
    )
}
