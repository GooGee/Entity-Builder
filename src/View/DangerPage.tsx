import ColorEnum from "@/Model/ColorEnum"
import useTreeStore from "@/Store/useTreeStore"
import { useEffect, useState } from "react"
import ColorButtonDropdown from "./Button/ColorButtonDropdown"
import makeLinkedTreeMap, { LinkedTreeNode } from "@/Factory/makeLinkedTreeMap"
import makeDirectory from "@/Database/Factory/makeDirectory"
import makeFile from "@/Database/Factory/makeFile"
import { Layerzz } from "@/Model/LayerEnum"
import ColorButtonGroup from "./Button/ColorButtonGroup"
import SelectStringButton from "./Button/SelectStringButton"

const id = 111222
let preset = {} as LB.AppInfoData

export default function DangerPage() {
    const suseTreeStore = useTreeStore()

    const [directoryzz, setDirectoryzz] = useState<LB.Directory[]>([])
    const [filezz, setFilezz] = useState<LB.File[]>([])
    const [root, setRoot] = useState<LinkedTreeNode<LB.Directory>>()
    const [text, setText] = useState("")

    useEffect(() => {
        fetch("preset.json")
            .then((r) => r.json())
            .then(function (aid: LB.AppInfoData) {
                preset = aid
                add1000()
                aid.db.tables.Directory.sort((aa, bb) => {
                    if (aa.parentId === null) {
                        return -1
                    }
                    if (bb.parentId === null) {
                        return 1
                    }
                    if (aa.parentId === bb.parentId) {
                        return aa.name.localeCompare(bb.name)
                    }
                    return aa.parentId - bb.parentId
                })
                setDirectoryzz(aid.db.tables.Directory)
                aid.db.tables.File.sort((aa, bb) => {
                    if (aa.directoryId === bb.directoryId) {
                        return aa.name.localeCompare(bb.name)
                    }
                    return aa.directoryId - bb.directoryId
                })
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

    function add1000() {
        // preset.db.tables.File.forEach(function (item) {
        //     if (item.directoryId === 1) {
        //         return
        //     }
        //     item.directoryId += 1000
        // })
        // preset.db.tables.Directory.forEach(function (item) {
        //     if (item.id === 1) {
        //         return
        //     }
        //     item.id += 1000
        //     if (item.parentId === 1 || item.parentId == null) {
        //         return
        //     }
        //     item.parentId += 1000
        // })
    }

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

    function makeDirectoryView(item: LinkedTreeNode<LB.Directory>) {
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
                                preset.db.tables.Directory = zz
                            }
                        }}
                    >
                        {item.name} {item.id}
                    </button>

                    <span className="hover-item">
                        <button
                            onClick={function addDirectory() {
                                const result = prompt("Please input the Directory name", "")
                                if (result == null) {
                                    return
                                }

                                if (directoryzz.find((item) => item.id === id)) {
                                    alert(`id ${id} already exists`)
                                    return
                                }

                                const data = makeDirectory(item.id, result)
                                setDirectoryzz([
                                    ...directoryzz,
                                    {
                                        ...data,
                                        id,
                                    },
                                ])
                            }}
                            className="button yellow mx-1"
                            type="button"
                        >
                            +
                        </button>
                        <button
                            onClick={function addFile() {
                                const result = prompt("Please input the File name", "")
                                if (result == null) {
                                    return
                                }

                                if (filezz.find((item) => item.id === id)) {
                                    alert(`id ${id} already exists`)
                                    return
                                }

                                const data = makeFile(result, item.id)
                                setFilezz([
                                    ...filezz,
                                    {
                                        ...data,
                                        id,
                                    },
                                ])
                            }}
                            className="button"
                            type="button"
                        >
                            +
                        </button>
                    </span>
                </div>

                {makeListView(item)}
            </div>
        )
    }

    function makeDpView() {
        if (suseTreeStore.directoryId === 0) {
            return null
        }
        const directory = directoryzz.find((item) => item.id === suseTreeStore.directoryId)
        if (directory === undefined) {
            return null
        }

        return (
            <table className="table table-borderless td0-tar">
                <tbody>
                    <tr>
                        <td style={{ width: "222px" }}>id</td>
                        <td>
                            <button
                                className="btn btn-outline-primary"
                                type="button"
                                onClick={function () {
                                    const result = prompt("Enter the new id", "" + directory.id)
                                    if (result == null) {
                                        return
                                    }
                                    const newId = parseInt(result)
                                    if (isNaN(newId)) {
                                        return
                                    }
                                    setDirectoryId(directory, newId)
                                }}
                            >
                                {directory.id}
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>name</td>
                        <td>
                            <div className="btn-group">
                                {directory.parentId === null ? null : (
                                    <button className="btn btn-outline-primary danger" type="button">
                                        -
                                    </button>
                                )}
                                <button
                                    className="btn btn-outline-primary"
                                    type="button"
                                    onClick={function () {
                                        const result = prompt("Enter the new name", directory.name)
                                        if (result == null) {
                                            return
                                        }
                                        updateDirectory({
                                            ...directory,
                                            name: result,
                                        })
                                    }}
                                >
                                    {directory.name}
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>description</td>
                        <td>
                            <textarea
                                className="form-control"
                                value={directory.description}
                                rows={3}
                                onChange={function () {}}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }

    function makeFileView(item: LB.File) {
        return (
            <div key={item.id}>
                <span className="text-primary">|</span>
                <button
                    onClick={() => suseTreeStore.showFile(item.id)}
                    className={"button" + (item.id === suseTreeStore.fileId ? " active" : "")}
                    type="button"
                >
                    {item.name} {item.id}
                </button>
            </div>
        )
    }

    function makeFpView() {
        if (suseTreeStore.fileId === 0) {
            return null
        }
        const file = filezz.find((item) => item.id === suseTreeStore.fileId)
        if (file === undefined) {
            return null
        }

        return (
            <table className="table table-borderless td0-tar">
                <tbody>
                    <tr>
                        <td style={{ width: "222px" }}>id</td>
                        <td>
                            <button
                                className="btn btn-outline-primary"
                                type="button"
                                onClick={function () {
                                    const result = prompt("Enter the new id", "" + file.id)
                                    if (result == null) {
                                        return
                                    }
                                    const newId = parseInt(result)
                                    if (isNaN(newId)) {
                                        return
                                    }
                                    setFileId(file, newId)
                                }}
                            >
                                {file.id}
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>name</td>
                        <td>
                            <div className="btn-group">
                                <button className="btn btn-outline-primary danger" type="button">
                                    -
                                </button>
                                <button
                                    className="btn btn-outline-primary"
                                    type="button"
                                    onClick={function () {
                                        const result = prompt("Enter the new name", file.name)
                                        if (result == null) {
                                            return
                                        }
                                        updateFile({
                                            ...file,
                                            name: result,
                                        })
                                    }}
                                >
                                    {file.name}
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>color</td>
                        <td>
                            <ColorButtonGroup
                                color={file.color}
                                setColor={(color) =>
                                    updateFile({
                                        ...file!,
                                        color,
                                    })
                                }
                            ></ColorButtonGroup>
                        </td>
                    </tr>
                    <tr>
                        <td>isSingle</td>
                        <td>
                            <div className="form-check form-switch">
                                <input
                                    checked={file.isSingle}
                                    onChange={(event) =>
                                        updateFile({
                                            ...file,
                                            isSingle: event.target.checked,
                                        })
                                    }
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id={"isSingleSwitchCheck" + file.id}
                                />
                                <label className="form-check-label" htmlFor={"isSingleSwitchCheck" + file.id}></label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>layer</td>
                        <td>
                            <SelectStringButton
                                allowEmpty
                                className="wa"
                                itemzz={Layerzz}
                                value={file.layer}
                                change={function (layer) {
                                    updateFile({
                                        ...file,
                                        layer,
                                    })
                                }}
                            ></SelectStringButton>
                        </td>
                    </tr>
                    <tr>
                        <td>nameSpacePattern</td>
                        <td>
                            <input
                                value={file.nameSpacePattern}
                                onChange={(event) =>
                                    updateFile({
                                        ...file!,
                                        nameSpacePattern: event.target.value,
                                    })
                                }
                                className="form-control"
                                type="text"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>fileNamePattern</td>
                        <td>
                            <input
                                value={file.fileNamePattern}
                                onChange={(event) =>
                                    updateFile({
                                        ...file!,
                                        fileNamePattern: event.target.value,
                                    })
                                }
                                className="form-control"
                                type="text"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>description</td>
                        <td>
                            <textarea className="form-control" value={file.description} onChange={function () {}} />
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }

    function makeListView(parent: LinkedTreeNode<LB.Directory>) {
        if (parent.opened === false) {
            return null
        }

        const fzz = filezz.filter((item) => item.directoryId === parent.id)
        return (
            <div className="ms-4">
                {parent.childzz.map(makeDirectoryView)}

                {fzz.map(makeFileView)}
            </div>
        )
    }

    function makeView() {
        if (suseTreeStore.keyword === "" && suseTreeStore.color === ColorEnum.white) {
            if (root) {
                return makeDirectoryView(root)
            }
            return null
        }

        return filter().map(makeFileView)
    }

    function setDirectoryId(old: LB.Directory, newId: number) {
        if (directoryzz.find((one) => one.id === newId)) {
            alert("id already exists")
            return
        }

        const dzz = directoryzz.map(function (one) {
            if (one.id === old.id) {
                return { ...one, id: newId }
            }
            if (one.parentId === old.id) {
                return { ...one, parentId: newId }
            }
            return one
        })
        setDirectoryzz(dzz)
        preset.db.tables.Directory = dzz

        const fzz = filezz.map(function (one) {
            if (one.directoryId === old.id) {
                return { ...one, directoryId: newId }
            }
            return one
        })
        setFilezz(fzz)
        preset.db.tables.File = fzz
    }

    function setFileId(old: LB.File, newId: number) {
        if (filezz.find((one) => one.id === newId)) {
            alert("id already exists")
            return
        }

        const fzz = filezz.map(function (one) {
            if (one.id === old.id) {
                return { ...one, id: newId }
            }
            return one
        })
        setFilezz(fzz)
        preset.db.tables.File = fzz
    }

    function updateDirectory(directory: LB.Directory) {
        const dzz = directoryzz.map(function (one) {
            if (one.id === directory.id) {
                return directory
            }
            return one
        })
        setDirectoryzz(dzz)
        preset.db.tables.Directory = dzz
    }

    function updateFile(file: LB.File) {
        const fzz = filezz.map(function (one) {
            if (one.id === file.id) {
                return file
            }
            return one
        })
        setFilezz(fzz)
        preset.db.tables.File = fzz
    }

    return (
        <div className="row">
            <div className="col-5 py-3 h100 overflow-auto">
                <div className="d-flex align-items-center justify-content-center">
                    <h1 className="inline">Tree</h1>
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

            <div className="col-7 py-3 h100 overflow-auto">
                {makeDpView()}
                {makeFpView()}

                <div className="m-3">
                    <button
                        onClick={function () {
                            setText(JSON.stringify(preset, null, 4))
                        }}
                        className="btn btn-outline-primary ms-3"
                        type="button"
                    >
                        toJSON
                    </button>
                </div>

                <textarea className="form-control" readOnly rows={11} value={text}></textarea>
            </div>
        </div>
    )
}
