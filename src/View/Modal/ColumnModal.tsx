import { makeColumnCRUD } from "@/Database/makeCRUD"
import useColumnModalStore from "@/Store/useColumnModalStore"
import useColumnzzStore from "@/Store/useColumnzzStore"
import useDoctrineColumnTypezzStore from "@/Store/useDoctrineColumnTypezzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import showNameInput from "@/View/Dialog/showNameInput"
import { useState, useEffect } from "react"
import ReactModal from "react-modal"
import SelectStringButton from "../Button/SelectStringButton"
import ColumnForm from "../Entity/ColumnForm"

function ColumnModal() {
    const columnzzStore = useColumnzzStore()
    const sDoctrineColumnTypezzStore = useDoctrineColumnTypezzStore()
    const sColumnModalStore = useColumnModalStore()
    const sToastzzStore = useToastzzStore()

    const [item, setItem] = useState<LB.Column>()

    useEffect(() => {
        if (sColumnModalStore.itemId === 0) {
            return
        }

        setItem(columnzzStore.find(sColumnModalStore.itemId))
    }, [sColumnModalStore.isOpen, sColumnModalStore.itemId])

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
            isOpen={sColumnModalStore.isOpen}
            onRequestClose={sColumnModalStore.close}
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}
        >
            <div className="mb-3">
                <button onClick={showInput} className="btn btn-outline-primary" type="button">
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

            <ColumnForm item={item} update={update}>
                <div className="mb-3">
                    <label className="form-label">type</label>
                    <SelectStringButton
                        itemzz={typezz}
                        value={item.type}
                        change={(type) => update({ ...item, type })}
                    ></SelectStringButton>
                </div>
                <div className="mb-3">
                    <label className="form-label">default</label>
                    <input
                        value={item.default}
                        onChange={(event) => update({ ...item, default: event.target.value })}
                        type="text"
                        className="form-control"
                    />
                </div>
            </ColumnForm>
        </ReactModal>
    )
}

export default ColumnModal
