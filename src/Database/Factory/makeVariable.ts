import { OmitId } from "../dbhelper"
import makeSideBarItem from "./makeSideBarItem"

export default function makeVariable(name: string): OmitId<LB.Variable> {
    return {
        ...makeSideBarItem(name),
        default: "",
        enum: [],
        type: "string",
    }
}
