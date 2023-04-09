import { PageEnum } from "@/menuzz"
import useEntityPageStore from "@/Store/useEntityPageStore"
import useEntityzzStore from "@/Store/useEntityzzStore"
import FlowView from "./Flow/FlowView"
import DirectoryModal from "./Modal/DirectoryModal"
import ListModal from "./Modal/ListModal"
import SideBar from "./Part/SideBar"

export default function FlowPage() {
    return (
        <div className="row">
            <SideBar
                title={PageEnum.Entity}
                itemzz={useEntityzzStore.getState().itemzz}
                useStore={useEntityPageStore}
            ></SideBar>

            <div className="col-9 h100 overflow-auto">
                <FlowView></FlowView>
            </div>

            <DirectoryModal></DirectoryModal>
            <ListModal></ListModal>
        </div>
    )
}
