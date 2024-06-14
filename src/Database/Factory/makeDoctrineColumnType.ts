import { OmitId } from "../dbhelper"
import makeSideBarItem from "./makeSideBarItem"

export default function makeDoctrineColumnType(
    name: string,
    phpType: string = "",
): OmitId<LB.DoctrineColumnType> {
    return {
        ...makeSideBarItem(name),
        fakeMethod: "",
        fakeText: "",
        oapiFormat: "",
        oapiType: "",
        phpType,
    }
}
