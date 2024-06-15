import ColorEnum from "@/Model/ColorEnum"
import { OmitId } from "../dbhelper"

export default function makeFile(name: string, directoryId: number): OmitId<LB.File> {
    return {
        directoryId,
        name,
        color: ColorEnum.white,
        isSingle: false,
        layer: "",
        description: "",
        nameSpacePattern: "",
        fileNamePattern: name + ".php",
    }
}

export function cloneFile(file: LB.File, directoryId: number): LB.File {
    return {
        ...file,
        directoryId,
    }
}
