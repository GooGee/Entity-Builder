import { OmitId } from "../dbhelper"

export default function makeWuParameter(
    wuId: number,
    name: string,
): OmitId<LB.WuParameter> {
    return {
        wuId,
        name,
        description: "",
    }
}
