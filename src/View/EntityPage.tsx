import { makeEntityWithId } from "@/Database/Factory/makeEntity"
import { makeEntityCRUD } from "@/Database/makeCRUD"
import useEntityPageStore from "@/Store/useEntityPageStore"
import useEntityzzStore from "@/Store/useEntityzzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import DirectoryModal from "./Modal/DirectoryModal"
import ListModal from "./Modal/ListModal"
import LeftRightPanel from "./Part/LeftRightPanel"
import EntityView from "./Entity/EntityView"
import { PageEnum } from "@/menuzz"

export default function EntityPage() {
    const sToastzzStore = useToastzzStore()

    return (
        <div className="row">
            <LeftRightPanel
                makeCRUD={makeEntityCRUD as any}
                onCreate={function (name) {
                    makeEntityWithId(name).catch(sToastzzStore.showError)
                }}
                useItemPageStore={useEntityPageStore}
                useItemzzStore={useEntityzzStore}
                title={PageEnum.Entity}
            >
                <EntityView></EntityView>
            </LeftRightPanel>

            <DirectoryModal></DirectoryModal>
            <ListModal></ListModal>
        </div>
    )
}
