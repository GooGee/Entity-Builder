import useFilezzStore from "@/Store/useFilezzStore"
import useEntityPageStore from "@/Store/useEntityPageStore"
import useEntityzzStore from "@/Store/useEntityzzStore"
import MigrationView from "./Migration/MigrationView"
import { PageEnum } from "@/menuzz"
import SideBar from "./Part/SideBar"
import { useEffect } from "react"

export default function MigrationPage() {
    const sEntityPageStore = useEntityPageStore()
    const sEntityzzStore = useEntityzzStore()
    const sFilezzStore = useFilezzStore()

    const file = sFilezzStore.find(1)

    if (file === undefined) {
        return (
            <div>
                <span className="text-danger">file Entity not found</span>
            </div>
        )
    }

    useEffect(() => {
        sEntityPageStore.setItem()
    }, [])

    return (
        <div className="row">
            <SideBar
                title={PageEnum.Entity}
                itemzz={sEntityzzStore.itemzz.filter((item) => item.isTable)}
                useStore={useEntityPageStore}
            ></SideBar>

            <div className="col-9 py-3 h100 overflow-auto">
                <MigrationView file={file}></MigrationView>
            </div>
        </div>
    )
}
