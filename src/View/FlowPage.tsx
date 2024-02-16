import FlowSideMenu from "./Flow/FlowSideMenu"
import FlowView from "./Flow/FlowView"
import DirectoryModal from "./Modal/DirectoryModal"

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
        </div>
    )
}
