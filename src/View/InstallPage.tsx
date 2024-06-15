import { getSingleFilezz } from "@/Service/install"
import { useState } from "react"
import FileItem from "./Entity/FileItem"
import useEntityzzStore from "@/Store/useEntityzzStore"

export default function InstallPage() {
    const [waiting, setWaiting] = useState(false)

    const entity = useEntityzzStore.getState().itemzz[0]

    return (
        <div className="row justify-content-center">
            <div className="col-6">
                <h1 className="text-secondary">create files</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <td>edit script / template</td>
                            <td>file</td>
                        </tr>
                    </thead>
                    <tbody>
                        {getSingleFilezz().map((item) => (
                            <FileItem entity={entity} item={item} key={item.id}></FileItem>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
