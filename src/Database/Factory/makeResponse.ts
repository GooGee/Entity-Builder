import { OapiType } from "@/Model/Oapi"
import { OmitId } from "../dbhelper"
import makeSideBarItem from "./makeSideBarItem"
import makeTypeFormat from "./makeTypeFormat"

export default function makeResponse(name: string, wuId: number): OmitId<LB.Response> {
    return {
        ...makeSideBarItem(name),
        example: "",
        mediaType: "application/json",
        tf: makeTypeFormat(OapiType.Wu, wuId),
    }
}
