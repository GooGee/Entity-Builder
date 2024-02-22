import { makeFileCRUD } from "@/Database/makeCRUD"
import Constant from "@/Model/Constant"
import { getCodeFileName, getFileFullNameInCode, ScriptExtention, TemplateExtention } from "@/Model/FileManager"
import showConfirm from "@/View/Dialog/showConfirm"
import useFilezzStore from "@/Store/useFilezzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import useTreeStore from "@/Store/useTreeStore"
import { useEffect, useState } from "react"
import ColorButtonGroup from "../Button/ColorButtonGroup"
import EditButton from "../Button/EditButton"
import { Layerzz } from "@/Model/LayerEnum"
import SelectStringButton from "../Button/SelectStringButton"
import showInput from "../Dialog/showInput"

export default function FileProperty() {
    const store = useFilezzStore()
    const treeStore = useTreeStore()
    const sToastzzStore = useToastzzStore()

    const [file, setFile] = useState<LB.File>()

    useEffect(() => {
        if (treeStore.fileId === 0) {
            return
        }

        setFile(store.find(treeStore.fileId))
    }, [treeStore.fileId, store.itemzz])

    if (treeStore.fileId === 0 || file === undefined) {
        return null
    }

    function update(data: LB.File) {
        setFile(data)
        makeFileCRUD().update(data!).then(setFile).catch(sToastzzStore.showError)
    }

    return (
        <table className="table table-borderless td0-tar">
            <tbody>
                <tr>
                    <td style={{ width: "222px" }}>id</td>
                    <td>{file.id}</td>
                </tr>
                <tr>
                    <td>name</td>
                    <td>
                        <div className="btn-group">
                            <button
                                onClick={() =>
                                    showConfirm()
                                        .then((response) => {
                                            if (response.isConfirmed) {
                                                treeStore.hide()
                                                return makeFileCRUD()
                                                    .delete(file!.id)
                                                    .then(() => sToastzzStore.showOK())
                                            }
                                        })
                                        .catch(sToastzzStore.showError)
                                }
                                className="btn btn-outline-primary danger"
                                type="button"
                            >
                                -
                            </button>
                            <button
                                onClick={() =>
                                    showInput("Please input the file name", file!.name).then((response) => {
                                        if (response.isConfirmed) {
                                            update({
                                                ...file!,
                                                name: response.value,
                                            })
                                        }
                                    })
                                }
                                className="btn btn-outline-primary"
                                type="button"
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
                                update({
                                    ...file!,
                                    color,
                                })
                            }
                        ></ColorButtonGroup>
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
                                update({
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
                                update({
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
                                update({
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
                        <textarea
                            className="form-control"
                            value={file.description}
                            onChange={(event) =>
                                update({
                                    ...file,
                                    description: event.target.value,
                                })
                            }
                        />
                    </td>
                </tr>
                <tr>
                    <td>script</td>
                    <td>
                        <EditButton
                            file={getFileFullNameInCode(getCodeFileName(file, ScriptExtention))}
                            content={Constant.ScriptCode}
                        ></EditButton>
                    </td>
                </tr>
                <tr>
                    <td>template</td>
                    <td>
                        <EditButton
                            file={getFileFullNameInCode(getCodeFileName(file, TemplateExtention))}
                            content=""
                        ></EditButton>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
