import { OmitId } from "../dbhelper"

export default function makeDirectory(
    parentId: number,
    name: string,
): OmitId<LB.Directory> {
    return {
        parentId,
        name,
        opened: true,
        description: "",
    }
}
