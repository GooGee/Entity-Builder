import { makeEntityCRUD } from "@/Database/makeCRUD"
import showNameInput from "@/View/Dialog/showNameInput"
import useEntityModalStore from "@/Store/useEntityModalStore"
import useEntityzzStore from "@/Store/useEntityzzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import { useEffect, useState } from "react"
import ReactModal from "react-modal"
import ColorButtonGroup from "../Button/ColorButtonGroup"

export default function EntityModal() {
    const modalStore = useEntityModalStore()
    const sEntityzzStore = useEntityzzStore()
    const sToastzzStore = useToastzzStore()

    const [item, setItem] = useState<LB.Entity>()

    useEffect(() => {
        if (modalStore.itemId === 0) {
            return
        }

        setItem(sEntityzzStore.find(modalStore.itemId))
    }, [modalStore.isOpen, modalStore.itemId])

    if (item === undefined) {
        return null
    }

    function showInput() {
        showNameInput("Please input the Entity name", item!.name)
            .then((response) => {
                if (response.isConfirmed) {
                    update({
                        ...item!,
                        name: response.value,
                    })
                }
            })
            .catch(sToastzzStore.showError)
    }

    function update(data: LB.Entity) {
        setItem(data)
        makeEntityCRUD().update(data).then(setItem).catch(sToastzzStore.showError)
    }

    return (
        <ReactModal
            isOpen={modalStore.isOpen}
            onRequestClose={modalStore.close}
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}
        >
            <div className="mb-3">
                <button
                    disabled={item.reserved}
                    onClick={showInput}
                    className="btn btn-outline-primary"
                    type="button"
                >
                    {item.name}
                </button>
            </div>
            <div className="mb-3">
                <label className="form-label">color</label>
                <ColorButtonGroup
                    color={item.color}
                    setColor={(color) => update({ ...item, color })}
                ></ColorButtonGroup>
            </div>
            <div className="mb-3">
                <label className="form-label">description</label>
                <textarea
                    value={item.description}
                    onChange={(event) =>
                        update({ ...item, description: event.target.value })
                    }
                    rows={3}
                    className="form-control"
                ></textarea>
            </div>
        </ReactModal>
    )
}
