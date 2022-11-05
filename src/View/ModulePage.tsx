import makeModule from "@/Database/Factory/makeModule"
import { makeModuleCRUD } from "@/Database/makeCRUD"
import useModulePageStore from "@/Store/useModulePageStore"
import useModulezzStore from "@/Store/useModulezzStore"
import useSchemazzStore from "@/Store/useSchemazzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import DirectoryModal from "./Modal/DirectoryModal"
import ModuleDetail from "./Module/ModuleDetail"
import LeftRightPanel from "./Part/LeftRightPanel"

export default function ModulePage() {
    const sModulePageStore = useModulePageStore()
    const sSchemazzStore = useSchemazzStore()
    const sToastzzStore = useToastzzStore()

    const schema = sSchemazzStore.itemzz[0]

    return (
        <div className="row">
            <LeftRightPanel
                makeCRUD={makeModuleCRUD as any}
                useItemPageStore={useModulePageStore}
                useItemzzStore={useModulezzStore}
                title="Module"
                validateName={false}
                onCreate={function (name) {
                    makeModuleCRUD()
                        .create(makeModule(name))
                        .catch(sToastzzStore.showError)
                }}
            >
                {sModulePageStore.item ? (
                    <ModuleDetail
                        item={sModulePageStore.item}
                        schema={schema}
                    ></ModuleDetail>
                ) : undefined}
            </LeftRightPanel>

            <DirectoryModal></DirectoryModal>
        </div>
    )
}
