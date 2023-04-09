import { makeEntityWithId } from "@/Database/Factory/makeEntity"
import { makeEntityCRUD } from "@/Database/makeCRUD"
import { PageEnum } from "@/menuzz"
import useEntityPageStore from "@/Store/useEntityPageStore"
import useEntityzzStore from "@/Store/useEntityzzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import EntityView from "./Entity/EntityView"
import DirectoryModal from "./Modal/DirectoryModal"
import ImportModal from "./Modal/ImportModal"
import ListModal from "./Modal/ListModal"
import LeftRightPanel from "./Part/LeftRightPanel"


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
            <ImportModal></ImportModal>
            <ListModal></ListModal>
        </div>
    )
}
