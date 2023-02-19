import { makeColumnCRUD } from "@/Database/makeCRUD"
import makeNumberInputHandler from "@/Factory/makeNumberInputHandler"
import useColumnModalStore from "@/Store/useColumnModalStore"
import useColumnzzStore from "@/Store/useColumnzzStore"
import useDoctrineColumnTypezzStore from "@/Store/useDoctrineColumnTypezzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import showNameInput from "@/View/Dialog/showNameInput"
import { useState, useEffect } from "react"
import ReactModal from "react-modal"
import SelectStringButton from "../Button/SelectStringButton"

function ColumnModal() {
    const columnzzStore = useColumnzzStore()
    const sDoctrineColumnTypezzStore = useDoctrineColumnTypezzStore()
    const modalStore = useColumnModalStore()
    const sToastzzStore = useToastzzStore()

    const [item, setItem] = useState<LB.Column>()

    useEffect(() => {
        if (modalStore.itemId === 0) {
            return
        }

        setItem(columnzzStore.find(modalStore.itemId))
    }, [modalStore.isOpen, modalStore.itemId])

    if (item === undefined) {
        return null
    }

    const typezz = sDoctrineColumnTypezzStore.itemzz.map((item) => item.name)

    function showInput() {
        showNameInput("Please input the column name", item!.name)
            .then((response) => {
                if (response.isConfirmed) {
                    return update({
                        ...item!,
                        name: response.value,
                    })
                }
            })
            .catch(sToastzzStore.showError)
    }

    function update(data: LB.Column) {
        setItem(data)
        makeColumnCRUD().update(data).then(setItem).catch(sToastzzStore.showError)
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
                    onClick={showInput}
                    className="btn btn-outline-primary"
                    type="button"
                >
                    {item.name}
                </button>

                <div className="form-check form-switch inline wa ms-3">
                    <input
                        checked={item.inTable}
                        onChange={(event) =>
                            update({
                                ...item,
                                inTable: event.target.checked,
                            })
                        }
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="inTableSwitchCheck"
                    />
                    <label className="form-check-label" htmlFor="inTableSwitchCheck">
                        inTable
                    </label>
                </div>
            </div>
            <div className="mb-3">
                <div className="form-check form-switch">
                    <input
                        checked={item.nullable}
                        onChange={(event) =>
                            update({ ...item, nullable: event.target.checked })
                        }
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="nullableSwitchCheck"
                    />
                    <label className="form-check-label" htmlFor="nullableSwitchCheck">
                        nullable
                    </label>
                </div>
            </div>
            <div className="mb-3">
                <div className="form-check form-switch">
                    <input
                        checked={item.unsigned}
                        onChange={(event) =>
                            update({ ...item, unsigned: event.target.checked })
                        }
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="unsignedSwitchCheck"
                    />
                    <label className="form-check-label" htmlFor="unsignedSwitchCheck">
                        unsigned
                    </label>
                </div>
            </div>
            <div className="mb-3">
                <label className="form-label">type</label>
                <SelectStringButton
                    itemzz={typezz}
                    value={item.type}
                    change={(type) => update({ ...item, type })}
                ></SelectStringButton>
            </div>
            <div className="mb-3">
                <label className="form-label">length</label>
                <input
                    value={item.length}
                    onChange={makeNumberInputHandler("length", item, update)}
                    type="number"
                    min={0}
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label className="form-label">scale</label>
                <input
                    value={item.scale}
                    onChange={makeNumberInputHandler("scale", item, update)}
                    type="number"
                    min={0}
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label className="form-label">default</label>
                <input
                    value={item.default}
                    onChange={(event) =>
                        update({ ...item, default: event.target.value })
                    }
                    type="text"
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label className="form-label">comment</label>
                <textarea
                    value={item.comment}
                    onChange={(event) =>
                        update({ ...item, comment: event.target.value })
                    }
                    className="form-control"
                ></textarea>
            </div>
        </ReactModal>
    )
}

export default ColumnModal
