import { makeCollectionCRUD } from "@/Database/makeCRUD"
import useCollectionzzStore from "@/Store/useCollectionzzStore"
import CollectionDetail from "./Collection/CollectionDetail"
import LeftRightPanel from "./Part/LeftRightPanel"
import makeCollection from "@/Database/Factory/makeCollection"
import useCollectionPageStore from "@/Store/useCollectionPageStore"
import ImportModal from "./Modal/ImportModal"
import { PageEnum } from "@/menuzz"

export default function CollectionPage() {
    return (
        <div className="row">
            <LeftRightPanel
                makeCRUD={makeCollectionCRUD as any}
                onCreate={function (name) {
                    makeCollectionCRUD().create(makeCollection(name))
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
