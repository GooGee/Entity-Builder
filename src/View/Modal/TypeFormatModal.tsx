import useTypeFormatModalStore from "@/Store/useTypeFormatModalStore"
import ReactModal from "react-modal"
import TypeFormat from "../Reference/TypeFormat"

export default function TypeFormatModal() {
    const sTypeFormatModalStore = useTypeFormatModalStore()

    if (sTypeFormatModalStore.item === undefined) {
        return null
    }

    return (
        <ReactModal
            className="top"
            isOpen={sTypeFormatModalStore.isOpen}
            onRequestClose={sTypeFormatModalStore.close}
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}
        >
            <h3>Change Type</h3>
            <TypeFormat
                id={0}
                item={sTypeFormatModalStore.item}
                update={sTypeFormatModalStore.update}
                wuId={sTypeFormatModalStore.wuId}
            ></TypeFormat>
        </ReactModal>
    )
}
