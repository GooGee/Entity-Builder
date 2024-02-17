import install, { CreateFilezz } from "@/Service/install"
import useFilezzStore from "@/Store/useFilezzStore"
import { useState } from "react"
import FileItem from "./Entity/FileItem"
import useEntityzzStore from "@/Store/useEntityzzStore"

export default function InstallPage() {
    const [waiting, setWaiting] = useState(false)

    const entity = useEntityzzStore.getState().itemzz[0]
    const set = new Set(CreateFilezz)
    const filezz = useFilezzStore.getState().itemzz.filter((item) => set.has(item.name))

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
                        {filezz.map((item) => (
                            <FileItem entity={entity} item={item} key={item.id}></FileItem>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
