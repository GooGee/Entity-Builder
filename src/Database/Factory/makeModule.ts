import { OmitId } from "../dbhelper"
import makeSideBarItem from "./makeSideBarItem"

export default function makeModule(name: string): OmitId<LB.Module> {
    return {
        ...makeSideBarItem(name),
        directoryId: 10,
        testDirectoryId: 10,
        prefix: "/" + name,
    }
}
