import { OapiType } from "@/Model/Oapi"
import { OmitId } from "../dbhelper"
import makeTypeFormat from "./makeTypeFormat"

export default function makeWuChild(
    wuId: number,
    type: OapiType,
    targetId: number,
): OmitId<LB.WuChild> {
    return {
        wuId,
        tf: makeTypeFormat(type, targetId),
    }
}
