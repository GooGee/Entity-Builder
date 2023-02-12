import { makeModuleCRUD } from "@/Database/makeCRUD"
import useModulePageStore from "@/Store/useModulePageStore"
import useModulezzStore from "@/Store/useModulezzStore"
import { useEffect } from "react"
import TabItemList from "../Part/TabItemList"

export default function ModuleTabList() {
    const sModulePageStore = useModulePageStore()
    const sModulezzStore = useModulezzStore()

    useEffect(() => {
        if (sModulePageStore.item === undefined) {
            makeModuleCRUD()
                .findAll()
                .then(function (itemzz) {
                    if (itemzz.length) {
                        sModulePageStore.setItem(itemzz[0])
                    }
                })
        }
    }, [])

    return (
        <div className="d-flex justify-content-center">
            <TabItemList
                empty
                first={<h3 className="me-2 text-secondary">Module</h3>}
                tab={sModulePageStore.item}
                tabzz={sModulezzStore.itemzz}
                setTab={(item) => sModulePageStore.setItem(item)}
            ></TabItemList>
        </div>
    )
}
