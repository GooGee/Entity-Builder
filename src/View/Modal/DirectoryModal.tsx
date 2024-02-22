import useDirectoryModalStore from "@/Store/useDirectoryModalStore"
import useDirectoryzzStore from "@/Store/useDirectoryzzStore"
import ReactModal from "react-modal"
import DirectoryDetail from "./DirectoryDetail"

export default function DirectoryModal() {
    const sDirectoryModal = useDirectoryModalStore()
    const sDirectoryzzStore = useDirectoryzzStore()

    const root = sDirectoryzzStore.itemzz.find((item) => item.parentId === null)

    return (
        <ReactModal
            isOpen={sDirectoryModal.isOpen}
            onRequestClose={sDirectoryModal.close}
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}
        >
            <h3>{sDirectoryModal.title}</h3>

            <button
                disabled={sDirectoryModal.itemId === 0}
                onClick={function () {
                    sDirectoryModal.callback(sDirectoryModal.itemId)
                    sDirectoryModal.close()
                }}
                className="btn btn-outline-primary"
                type="button"
            >
                OK
            </button>

            <div>{root === undefined ? "no root" : <DirectoryDetail item={root}></DirectoryDetail>}</div>
        </ReactModal>
    )
}
