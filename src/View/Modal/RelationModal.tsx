import { makeRelationCRUD } from "@/Database/makeCRUD"
import { getRelationMeaning } from "@/Database/RelationType"
import showNameInput from "@/View/Dialog/showNameInput"
import useColumnzzStore from "@/Store/useColumnzzStore"
import useRelationModalStore from "@/Store/useRelationModalStore"
import useRelationzzStore from "@/Store/useRelationzzStore"
import useSchemazzStore from "@/Store/useSchemazzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import { useState, useEffect } from "react"
import ReactModal from "react-modal"
import SelectButton from "../Button/SelectButton"

function RelationModal() {
    const columnzzStore = useColumnzzStore()
    const relationzzStore = useRelationzzStore()
    const schemazzStore = useSchemazzStore()
    const modalStore = useRelationModalStore()
    const sToastzzStore = useToastzzStore()

    const [store, setStore] = useState<LB.Relation>()
    const [schema0, setSchema0] = useState("")
    const [schema1, setSchema1] = useState("")

    useEffect(() => {
        if (modalStore.itemId === 0) {
            return
        }

        const item = relationzzStore.find(modalStore.itemId)
        if (item === undefined) {
            return
        }

        setStore(item)
        setSchema0(schemazzStore.find(item.schema0Id)?.name ?? "")
        setSchema1(schemazzStore.find(item.schema1Id)?.name ?? "")
    }, [modalStore.isOpen, modalStore.itemId])

    if (store === undefined) {
        return null
    }

    const columnzz = columnzzStore.itemzz.filter(
        (item) => item.schemaId === store.schema1Id,
    )

    function showInput0() {
        showNameInput("Please input the name", store!.name0)
            .then((response) => {
                if (response.isConfirmed) {
                    update({
                        ...store!,
                        name0: response.value,
                    })
                }
            })
            .catch(sToastzzStore.showError)
    }

    function showInput1() {
        showNameInput("Please input the name", store!.name1)
            .then((response) => {
                if (response.isConfirmed) {
                    update({
                        ...store!,
                        name1: response.value,
                    })
                }
            })
            .catch(sToastzzStore.showError)
    }

    function update(data: LB.Relation) {
        makeRelationCRUD()
            .update(data)
            .then(setStore)
            .catch(sToastzzStore.showError)
    }

    return (
        <ReactModal
            isOpen={modalStore.isOpen}
            onRequestClose={modalStore.close}
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}
        >
            <table className="table">
                <thead>
                    <tr>
                        <td>Schema</td>
                        <td>relation</td>
                        <td>name</td>
                        <td>foreign key</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{schema0}</td>
                        <td className="text-secondary">
                            {getRelationMeaning(store.type)}
                        </td>
                        <td>
                            <button
                                onClick={showInput0}
                                className="btn btn-outline-primary"
                                type="button"
                            >
                                {store.name0}
                            </button>
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>{schema1}</td>
                        <td className="text-secondary">
                            {getRelationMeaning(store.type, true)}
                        </td>
                        <td>
                            <button
                                onClick={showInput1}
                                className="btn btn-outline-primary"
                                type="button"
                            >
                                {store.name1}
                            </button>
                        </td>
                        <td>
                            <SelectButton
                                itemzz={columnzz}
                                value={store.column1Id}
                                change={function (column1Id, item) {
                                    update({
                                        ...store,
                                        column1Id,
                                    })
                                }}
                            ></SelectButton>
                        </td>
                    </tr>
                </tbody>
            </table>
        </ReactModal>
    )
}

export default RelationModal
