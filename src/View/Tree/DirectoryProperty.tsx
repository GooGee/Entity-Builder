import { makeDirectoryCRUD } from "@/Database/makeCRUD"
import findChindzz from "@/Service/findChindzz"
import showConfirm from "@/View/Dialog/showConfirm"
import useDirectoryzzStore from "@/Store/useDirectoryzzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import useTreeStore from "@/Store/useTreeStore"
import { useEffect, useState } from "react"
import showInput from "../Dialog/showInput"

export default function DirectoryProperty() {
    const store = useDirectoryzzStore()
    const treeStore = useTreeStore()
    const sToastzzStore = useToastzzStore()

    const [directory, setDirectory] = useState<LB.Directory | undefined>()

    useEffect(() => {
        if (treeStore.directoryId === 0) {
            return
        }

        setDirectory(store.find(treeStore.directoryId))
    }, [treeStore.directoryId, store.itemzz])

    if (treeStore.directoryId === 0 || directory === undefined) {
        return null
    }

    function update(data: LB.Directory) {
        setDirectory(data)
        makeDirectoryCRUD().update(data).then(setDirectory).catch(sToastzzStore.showError)
    }

    return (
        <table className="table table-borderless td0-tar">
            <tbody>
                <tr>
                    <td style={{ width: "222px" }}>id</td>
                    <td>{directory.id}</td>
                </tr>
                <tr>
                    <td>name</td>
                    <td>
                        <div className="btn-group">
                            {directory.parentId === null ? null : (
                                <button
                                    onClick={() =>
                                        showConfirm("Delete all included directories and files. Continue?")
                                            .then((response) => {
                                                if (response.isConfirmed) {
                                                    treeStore.hide()
                                                    const idzz = findChindzz(store.itemzz, directory!.id).map(
                                                        (item) => item.id,
                                                    )
                                                    idzz.push(directory!.id)
                                                    return makeDirectoryCRUD()
                                                        .deleteMany(idzz)
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
                            )}
                            <button
                                onClick={() =>
                                    showInput("Please input the directory name", directory!.name).then((response) => {
                                        if (response.isConfirmed) {
                                            update({
                                                ...directory!,
                                                name: response.value,
                                            })
                                        }
                                    })
                                }
                                className="btn btn-outline-primary"
                                type="button"
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
                            onChange={(event) =>
                                update({
                                    ...directory,
                                    description: event.target.value,
                                })
                            }
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
