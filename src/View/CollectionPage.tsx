import { makeCollectionCRUD } from "@/Database/makeCRUD"
import useCollectionzzStore from "@/Store/useCollectionzzStore"
import CollectionDetail from "./Collection/CollectionDetail"
import LeftRightPanel from "./Part/LeftRightPanel"
import makeCollection from "@/Database/Factory/makeCollection"
import useCollectionPageStore from "@/Store/useCollectionPageStore"
import ImportModal from "./Modal/ImportModal"
import { PageEnum } from "@/menuzz"
import useToastzzStore from "@/Store/useToastzzStore"

export default function CollectionPage() {
    const sToastzzStore = useToastzzStore()

    return (
        <div className="row">
            <LeftRightPanel
                makeCRUD={makeCollectionCRUD as any}
                onCreate={function (name) {
                    makeCollectionCRUD()
                        .create(makeCollection(name))
                        .catch(sToastzzStore.showError)
                }}
                useItemPageStore={useCollectionPageStore}
                useItemzzStore={useCollectionzzStore}
                title={PageEnum.Collection}
            >
                <CollectionDetail></CollectionDetail>
            </LeftRightPanel>

            <ImportModal></ImportModal>
        </div>
    )
}
