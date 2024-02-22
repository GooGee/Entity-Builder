import { PageEnum } from "@/menuzz"
import useEntityPageStore from "@/Store/useEntityPageStore"
import useEntityzzStore from "@/Store/useEntityzzStore"
import useFilezzStore from "@/Store/useFilezzStore"
import MigrationView from "./Migration/MigrationView"
import SideBar from "./Part/SideBar"

export default function MigrationPage() {
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
