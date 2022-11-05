import makeSchema from "@/Database/Factory/makeSchema"
import { makeSchemaCRUD } from "@/Database/makeCRUD"
import useFilezzStore from "@/Store/useFilezzStore"
import useSchemaPageStore from "@/Store/useSchemaPageStore"
import useSchemazzStore from "@/Store/useSchemazzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import MigrationView from "./Migration/MigrationView"
import LeftRightPanel from "./Part/LeftRightPanel"

export default function MigrationPage() {
    const sFilezzStore = useFilezzStore()
    const sToastzzStore = useToastzzStore()

    const file = sFilezzStore.find(1)

    if (file === undefined) {
        return (
            <div>
                <span className="text-danger">file Entity not found</span>
            </div>
        )
    }

    return (
        <div className="row">
            <LeftRightPanel
                makeCRUD={makeSchemaCRUD as any}
                useItemPageStore={useSchemaPageStore}
                useItemzzStore={useSchemazzStore}
                title="Schema"
                validateName={false}
                onCreate={function (name) {
                    makeSchemaCRUD()
                        .create(makeSchema(name))
                        .catch(sToastzzStore.showError)
                }}
            >
                <MigrationView file={file}></MigrationView>
            </LeftRightPanel>
        </div>
    )
}
