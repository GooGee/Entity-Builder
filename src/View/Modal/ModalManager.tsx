import useColumnModalStore from "@/Store/useColumnModalStore"
import useRelationModalStore from "@/Store/useRelationModalStore"
import useEntityModalStore from "@/Store/useEntityModalStore"
import ColumnModal from "./ColumnModal"
import EntityModal from "./EntityModal"
import RelationModal from "./RelationModal"

function ModalManager() {
    const columnModalStore = useColumnModalStore()
    const relationModalStore = useRelationModalStore()
    const sEntityModalStore = useEntityModalStore()

    return (
        <>
            {columnModalStore.isOpen ? <ColumnModal></ColumnModal> : null}
            {relationModalStore.isOpen ? <RelationModal></RelationModal> : null}
            {sEntityModalStore.isOpen ? <EntityModal></EntityModal> : null}
        </>
    )
}

export default ModalManager
