import { OmitId } from "../dbhelper"
import makeResponse from "./makeResponse"

export default function makeRequest(name: string, wuId: number): OmitId<LB.Request> {
    return {
        required: true,
        ...makeResponse(name, wuId),
    }
}
