import makeModule from "@/Database/Factory/makeModule"
import { makeModuleCRUD } from "@/Database/makeCRUD"
import { PageEnum } from "@/menuzz"
import useEntityzzStore from "@/Store/useEntityzzStore"
import useModulePageStore from "@/Store/useModulePageStore"
import useModulezzStore from "@/Store/useModulezzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import ModuleDetail from "./Flow/ModuleDetail"
import LeftRightPanel from "./Part/LeftRightPanel"

export default function ModulePage() {
    const sEntityzzStore = useEntityzzStore()
    const sModulePageStore = useModulePageStore()
    const sToastzzStore = useToastzzStore()

    return (
        <div className="row">
            <LeftRightPanel
                makeCRUD={makeModuleCRUD as any}
                useItemPageStore={useModulePageStore}
                useItemzzStore={useModulezzStore}
                title={PageEnum.Module}
                validateName={false}
                onCreate={function (name) {
                    makeModuleCRUD()
                        .create(makeModule(name))
                        .catch(sToastzzStore.showError)
                }}
            >
                {sModulePageStore.item ? (
                    <ModuleDetail
                        entity={sEntityzzStore.itemzz[0]}
                        item={sModulePageStore.item}
                    ></ModuleDetail>
                ) : undefined}
            </LeftRightPanel>
        </div>
    )
}
