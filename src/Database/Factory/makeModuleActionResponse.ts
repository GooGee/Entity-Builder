import { OmitId } from "../dbhelper"

export default function makeModuleActionResponse(
    status: string,
    moduleActionId: number,
    responseId: number = 1000,
): OmitId<LB.ModuleActionResponse> {
    return {
        status,
        responseId,
        moduleActionId,
        description: "",
    }
}
