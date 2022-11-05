import { OapiType } from "@/Model/Oapi"

export default function makeTypeFormat(
    type = OapiType.string,
    targetId = 0,
): LB.TypeFormat {
    return {
        isArray: false,
        nullable: false,
        type,
        format: "",
        targetId,
        argumentzz: [],
    }
}
