import makeDoctrineColumnType from "@/Database/Factory/makeDoctrineColumnType"
import { makeDoctrineColumnTypeCRUD } from "@/Database/makeCRUD"
import { PageEnum } from "@/menuzz"
import useDoctrineColumnTypezzStore from "@/Store/useDoctrineColumnTypezzStore"
import useDoctrinePageStore from "@/Store/useDoctrinePageStore"
import useToastzzStore from "@/Store/useToastzzStore"
import DoctrineView from "./Doctrine/DoctrineView"
import ImportModal from "./Modal/ImportModal"
import LeftRightPanel from "./Part/LeftRightPanel"

export default function DoctrinePage() {
    const sDoctrinePageStore = useDoctrinePageStore()
    const sToastzzStore = useToastzzStore()

    return (
        <div className="row">
            <LeftRightPanel
                makeCRUD={makeDoctrineColumnTypeCRUD as any}
                onCreate={function (name) {
                    makeDoctrineColumnTypeCRUD().create(makeDoctrineColumnType(name)).catch(sToastzzStore.showError)
                }}
                useItemPageStore={useDoctrinePageStore}
                useItemzzStore={useDoctrineColumnTypezzStore}
                title={PageEnum.Doctrine}
            >
                {sDoctrinePageStore.item === undefined ? undefined : (
                    <DoctrineView item={sDoctrinePageStore.item!}></DoctrineView>
                )}
            </LeftRightPanel>

            <ImportModal></ImportModal>
        </div>
    )
}
