import ColorEnum from "@/Model/ColorEnum"
import { OmitId } from "../dbhelper"

export default function makeFile(name: string, directoryId: number): OmitId<LB.File> {
    let fn = name
    if (name.includes('.') === false) {
        fn = fn + ".php"
    }
    return {
        directoryId,
        name,
        color: ColorEnum.white,
        isSingle: false,
        layer: "",
        description: "",
        nameSpacePattern: "",
        fileNamePattern: fn,
    }
}

export function cloneFile(file: LB.File, directoryId: number): LB.File {
    return {
        ...file,
        directoryId,
    }
}
