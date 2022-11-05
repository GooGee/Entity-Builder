import { OmitId } from "../dbhelper"
import makeSideBarItem from "./makeSideBarItem"

export default function makeCollection(name: string): OmitId<LB.Collection> {
    return {
        ...makeSideBarItem(name),
        valueDescription: "",
        tagDescription: "",
    }
}
