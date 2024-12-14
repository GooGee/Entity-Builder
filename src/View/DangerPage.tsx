import ColorEnum from "@/Model/ColorEnum"
import useTreeStore from "@/Store/useTreeStore"
import { useEffect, useState } from "react"
import File from "./Tree/File"
import FileList from "./Tree/FileList"
import { PageEnum } from "@/menuzz"
import ColorButtonDropdown from "./Button/ColorButtonDropdown"
import makeLinkedTreeMap, { LinkedTreeNode } from "@/Factory/makeLinkedTreeMap"

export default function DangerPage() {
    const suseTreeStore = useTreeStore()

    const [directoryzz, setDirectoryzz] = useState<LB.Directory[]>([])
    const [filezz, setFilezz] = useState<LB.File[]>([])
    const [root, setRoot] = useState<LinkedTreeNode<LB.Directory>>()

    useEffect(() => {
        fetch("preset.json")
            .then((r) => r.json())
            .then(function (aid: LB.AppInfoData) {
                setDirectoryzz(aid.db.tables.Directory)
                setFilezz(aid.db.tables.File)
            })
    }, [])

    useEffect(() => {
        const treeMap = makeLinkedTreeMap<LB.Directory>(directoryzz)
        const found = treeMap.get(1)
        if (found) {
            setRoot(found)
        }
    }, [directoryzz])

    function filter() {
        if (suseTreeStore.color === ColorEnum.white) {
            if (suseTreeStore.keyword === "") {
                return filezz
            }
            return filezz.filter((item) => item.name.includes(suseTreeStore.keyword))
        }

        if (suseTreeStore.keyword === "") {
            return filezz.filter((item) => item.color === suseTreeStore.color)
        }
        return filezz.filter((item) => item.color === suseTreeStore.color && item.name.includes(suseTreeStore.keyword))
    }

    function makeDirectory(item: LinkedTreeNode<LB.Directory>) {
        return (
            <div key={item.id}>
                <div className="hover-group my-1">
                    <span className="text-warning">|</span>
                    <button
                        className={"button yellow" + (item.id === suseTreeStore.directoryId ? " active" : "")}
                        type="button"
                        onClick={function () {
                            suseTreeStore.showDirectory(item.id)
                            if (item.parentId === null) {
                                return
                            }
                            if (suseTreeStore.directoryId === item.id) {
                                const zz = directoryzz.map(function (one) {
                                    if (one.id === item.id) {
                                        return { ...one, opened: !one.opened }
                                    }
                                    return one
                                })
                                setDirectoryzz(zz)
                            }
                        }}
                    >
                        {item.name}
                    </button>

                    <button
                        className="button yellow"
                        type="button"
                        onClick={function () {
                            const result = prompt("Enter new id", "" + item.id)
                            if (result == null) {
                                return
                            }
                            const newId = parseInt(result)
                            if (isNaN(newId)) {
                                return
                            }
                            setDirectoryId(item.id, newId)
                        }}
                    >
                        {item.id}
                    </button>
                </div>

                {makeList(item)}
            </div>
        )
    }

    function makeList(parent: LinkedTreeNode<LB.Directory>) {
        if (parent.opened === false) {
            return null
        }

        const fzz = filezz.filter((item) => item.directoryId === parent.id)
        return (
            <div className="ms-4">
                {parent.childzz.map((item) => makeDirectory(item))}

                <FileList directoryId={parent.id} itemzz={fzz}></FileList>
            </div>
        )
    }

    function makeView() {
        if (suseTreeStore.keyword === "" && suseTreeStore.color === ColorEnum.white) {
            if (root) {
                return makeDirectory(root)
            }
            return null
        }

        return filter().map((item) => <File key={item.id} item={item}></File>)
    }

    function setDirectoryId(oldId: number, newId: number) {
        if (directoryzz.find((one) => one.id === newId)) {
            alert("id already exists")
            return
        }

        const dzz = directoryzz.map(function (one) {
            if (one.id === oldId) {
                return { ...one, id: newId }
            }
            if (one.parentId === oldId) {
                return { ...one, parentId: newId }
            }
            return one
        })
        setDirectoryzz(dzz)

        const fzz = filezz.map(function (one) {
            if (one.directoryId === oldId) {
                return { ...one, directoryId: newId }
            }
            return one
        })
        setFilezz(fzz)
    }

    return (
        <div className="row">
            <div className="col-5 py-3 h100 overflow-auto">
                <div className="d-flex align-items-center justify-content-center">
                    <h1 className="inline">{PageEnum.DangerPage}</h1>
                    <ColorButtonDropdown
                        color={suseTreeStore.color}
                        setColor={suseTreeStore.setColor}
                        className="mx-1"
                    ></ColorButtonDropdown>
                </div>

                <input
                    value={suseTreeStore.keyword}
                    onChange={(event) => suseTreeStore.search(event.target.value)}
                    className="form-control"
                    type="text"
                />

                {makeView()}
            </div>

            <div className="col-7 py-3 h100 overflow-auto"></div>
        </div>
    )
}
