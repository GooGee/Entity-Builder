import { OmitId } from "../dbhelper"
import makeSideBarItem from "./makeSideBarItem"

export default function makeExample(name: string): OmitId<LB.Example> {
    return {
        ...makeSideBarItem(name),
        summary: "",
        value: "",
    }
}
