import makeDirectory from "@/Database/Factory/makeDirectory"
import makeFile from "@/Database/Factory/makeFile"
import { makeDirectoryCRUD, makeFileCRUD } from "@/Database/makeCRUD"
import useDirectoryzzStore from "@/Store/useDirectoryzzStore"
import useFilezzStore from "@/Store/useFilezzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import useTreeStore from "@/Store/useTreeStore"
import { useState, useEffect } from "react"
import showInput from "../Dialog/showInput"
import DirectoryList from "./DirectoryList"
import FileList from "./FileList"

interface Property {
    item: LB.Directory
}

function Directory(property: Property) {
    const filezzStore = useFilezzStore()
    const store = useDirectoryzzStore()
    const treeStore = useTreeStore()
    const sToastzzStore = useToastzzStore()

    const [directoryzz, setDirectoryzz] = useState<LB.Directory[]>([])
    const [filezz, setFilezz] = useState<LB.File[]>([])

    useEffect(() => {
        setDirectoryzz(
            store.itemzz
                .filter((item) => item.parentId === property.item.id)
                .sort((aa, bb) => aa.name.localeCompare(bb.name)),
        )
    }, [store.itemzz])

    useEffect(() => {
        setFilezz(
            filezzStore.itemzz
                .filter((item) => item.directoryId === property.item.id)
                .sort((aa, bb) => aa.name.localeCompare(bb.name)),
        )
    }, [filezzStore.itemzz])

    function addDirectory() {
        showInput("Please input the Directory name", "")
            .then((response) => {
                if (response.isConfirmed) {
                    const data = makeDirectory(property.item.id, response.value)
                    return makeDirectoryCRUD()
                        .create(data)
                        .then(() => sToastzzStore.showOK())
                }
            })
            .catch(sToastzzStore.showError)
    }

    function addFile() {
        showInput("Please input the File name", "")
            .then((response) => {
                if (response.isConfirmed) {
                    const data = makeFile(response.value, property.item.id)
                    return makeFileCRUD()
                        .create(data)
                        .then(() => sToastzzStore.showOK())
                }
            })
            .catch(sToastzzStore.showError)
    }

    return (
        <div>
            <div className="hover-group my-1">
                <span className="text-warning">|</span>
                <button
                    onClick={() => {
                        treeStore.showDirectory(property.item.id)
                        if (property.item.parentId === null) {
                            return
                        }
                        if (treeStore.directoryId === property.item.id) {
                            makeDirectoryCRUD()
                                .update({
                                    ...property.item,
                                    opened: !property.item.opened,
                                })
                                .then((response) =>
                                    store.setItem({
                                        ...property.item,
                                        ...response,
                                    }),
                                )
                                .catch(sToastzzStore.showError)
                        }
                    }}
                    className={
                        "button yellow" +
                        (property.item.id === treeStore.directoryId ? " active" : "")
                    }
                    type="button"
                >
                    {property.item.name}
                </button>
                <span className="text-secondary mx-1">
                    {directoryzz.length + filezz.length}
                </span>
                <span className="hover-item">
                    <button
                        onClick={addDirectory}
                        className="button yellow mx-1"
                        type="button"
                    >
                        +
                    </button>
                    <button onClick={addFile} className="button" type="button">
                        +
                    </button>
                </span>
            </div>
            {property.item.opened ? (
                <div className="ms-4">
                    <DirectoryList
                        parentId={property.item.id}
                        itemzz={directoryzz}
                    ></DirectoryList>
                    <FileList directoryId={property.item.id} itemzz={filezz}></FileList>
                </div>
            ) : null}
        </div>
    )
}

export default Directory
