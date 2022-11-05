import { makeSchemaWithId } from "@/Database/Factory/makeSchema"
import { makeSchemaCRUD } from "@/Database/makeCRUD"
import useSchemaPageStore from "@/Store/useSchemaPageStore"
import useSchemazzStore from "@/Store/useSchemazzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import DirectoryModal from "./Modal/DirectoryModal"
import ListModal from "./Modal/ListModal"
import LeftRightPanel from "./Part/LeftRightPanel"
import SchemaView from "./Schema/SchemaView"

export default function SchemaPage() {
    const sToastzzStore = useToastzzStore()

    return (
        <div className="row">
            <LeftRightPanel
                makeCRUD={makeSchemaCRUD as any}
                onCreate={function (name) {
                    makeSchemaWithId(name).catch(sToastzzStore.showError)
                }}
                useItemPageStore={useSchemaPageStore}
                useItemzzStore={useSchemazzStore}
                title="Schema"
            >
                <SchemaView></SchemaView>
            </LeftRightPanel>

            <DirectoryModal></DirectoryModal>
            <ListModal></ListModal>
        </div>
    )
}
