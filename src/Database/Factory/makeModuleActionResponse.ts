import { OmitId } from "../dbhelper"

export default function makeModuleActionResponse(
    status: string,
    moduleActionId: number,
    responseId: number = 2,
): OmitId<LB.ModuleActionResponse> {
    return {
        status,
        responseId,
        moduleActionId,
        description: "",
    }
}
