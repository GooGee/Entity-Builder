import { OmitId } from "../dbhelper"
import makeResponse from "./makeResponse"

export default function makeRequest(name: string): OmitId<LB.Request> {
    return {
        required: true,
        ...makeResponse(name),
    }
}
