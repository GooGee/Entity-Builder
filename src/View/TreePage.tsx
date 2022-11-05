import ColorEnum from "@/Model/ColorEnum"
import useDirectoryzzStore from "@/Store/useDirectoryzzStore"
import useFilezzStore from "@/Store/useFilezzStore"
import useTreeStore from "@/Store/useTreeStore"
import { useEffect, useState } from "react"
import ColorButtonDropdown from "./Button/ColorButtonDropdown"
import Directory from "./Tree/Directory"
import DirectoryProperty from "./Tree/DirectoryProperty"
import File from "./Tree/File"
import FileView from "./Tree/FileView"

function TreePage() {
    const directoryzzStore = useDirectoryzzStore()
    const filezzStore = useFilezzStore()
    const store = useTreeStore()

    const [filezz, setFilezz] = useState<LB.File[]>([])
    const [root, setRoot] = useState<LB.Directory>()

    useEffect(() => {
        const found = directoryzzStore.itemzz.find((item) => item.parentId === null)
        if (found) {
            setRoot(found)
        }
    }, [filezzStore.itemzz])

    useEffect(() => {
        setFilezz(getFilezz())
    }, [store.color, store.keyword])

    function getFilezz() {
        if (store.keyword === "" && store.color === ColorEnum.white) {
            return []
        }

        if (store.color === ColorEnum.white) {
            return filezzStore.itemzz.filter((item) =>
                item.name.includes(store.keyword),
            )
        }

        if (store.keyword === "") {
            return filezzStore.itemzz.filter((item) => item.color === store.color)
        }

        return filezzStore.itemzz.filter(
            (item) => item.color === store.color && item.name.includes(store.keyword),
        )
    }

    function getView() {
        if (store.keyword === "" && store.color === ColorEnum.white) {
            if (root) {
                return <Directory item={root}></Directory>
            }
            return null
        }

        return filezz.map((item) => <File key={item.id} item={item}></File>)
    }

    return (
        <div className="row">
            <div className="col-5 py-3 h100 overflow-auto">
                <div className="d-flex align-items-center justify-content-center">
                    <h1 className="inline">Tree</h1>
                    <ColorButtonDropdown
                        color={store.color}
                        setColor={store.setColor}
                        className="mx-1"
                    ></ColorButtonDropdown>
                </div>

                <input
                    value={store.keyword}
                    onChange={(event) => store.search(event.target.value)}
                    className="form-control"
                    type="text"
                />

                {getView()}
            </div>
            <div className="col-7 py-3 h100 overflow-auto">
                {store.directoryId ? <DirectoryProperty></DirectoryProperty> : null}
                {store.fileId ? <FileView></FileView> : null}
            </div>
        </div>
    )
}

export default TreePage
