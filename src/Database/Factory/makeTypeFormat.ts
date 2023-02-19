import { OapiType } from "@/Model/Oapi"
import { OmitId } from "../dbhelper"

export default function makeTypeFormat(
    type = OapiType.string,
    wuId: number = 1,
    wuParameterId: number | null = null,
    variableId: number | null = null,
    ownerId: number | null = null,
    forWuParameterId: number | null = null,
    ownerColumnId: number | null = null,
    format = "",
): OmitId<LB.TypeFormat> {
    return {
        isArray: false,
        nullable: false,
        type,
        format,
        forWuParameterId,
        ownerId,
        variableId,
        wuId,
        wuParameterId,
        ownerColumnId,
        ownerRequestId: null,
        ownerResponseId: null,
        ownerWuId: null,
        ownerWuChildId: null,
    }
}
