import { OmitId } from "../dbhelper"
import makeSideBarItem from "./makeSideBarItem"

export default function makeResponse(name: string): OmitId<LB.Response> {
    return {
        ...makeSideBarItem(name),
        example: "",
        mediaType: "application/json",
    }
}
