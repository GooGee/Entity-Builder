import FlowSideMenu from "./Flow/FlowSideMenu"
import FlowView from "./Flow/FlowView"
import DirectoryModal from "./Modal/DirectoryModal"
import ListModal from "./Modal/ListModal"

export default function FlowPage() {
    return (
        <div className="row">
            <div className="col-3 h100 overflow-auto">
                <FlowSideMenu></FlowSideMenu>
            </div>

            <div className="col-9 h100 overflow-auto">
                <FlowView></FlowView>
            </div>

            <DirectoryModal></DirectoryModal>
            <ListModal></ListModal>
        </div>
    )
}
