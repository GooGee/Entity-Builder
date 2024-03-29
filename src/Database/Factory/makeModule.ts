import { OmitId } from "../dbhelper"
import makeSideBarItem from "./makeSideBarItem"

export default function makeModule(name: string): OmitId<LB.Module> {
    return {
        ...makeSideBarItem(name),
        directoryId: 10,
        fileId: 53,
        testDirectoryId: 10,
        prefix: "/" + name,
    }
}
