import { makeCollectionCRUD } from "@/Database/makeCRUD"
import useCollectionzzStore from "@/Store/useCollectionzzStore"
import CollectionDetail from "./Collection/CollectionDetail"
import LeftRightPanel from "./Part/LeftRightPanel"
import makeCollection from "@/Database/Factory/makeCollection"
import useCollectionPageStore from "@/Store/useCollectionPageStore"
import ImportModal from "./Modal/ImportModal"

export default function CollectionPage() {
    return (
        <div className="row">
            <LeftRightPanel
                sorting={true}
                makeCRUD={makeCollectionCRUD as any}
                onCreate={function (name) {
                    makeCollectionCRUD().create(makeCollection(name))
                }}
                useItemPageStore={useCollectionPageStore}
                useItemzzStore={useCollectionzzStore}
                title="Collection"
            >
                <CollectionDetail></CollectionDetail>
            </LeftRightPanel>

            <ImportModal></ImportModal>
        </div>
    )
}
