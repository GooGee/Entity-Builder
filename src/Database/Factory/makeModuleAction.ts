import { OmitId } from "../dbhelper"
import { findWrapperWuId } from "@/Service/findWrapperWu"

export default function makeModuleAction(
    name: string,
    entity: LB.Entity,
    module: LB.Module,
    itemzz: LB.Wu[],
): OmitId<LB.ModuleAction> {
    const responseWuId = findWrapperWuId(name, itemzz)
    return {
        deprecated: false,
        name: name,
        description: "",
        routeName: "",
        filezz: [],
        summary: '',
        directoryId: module.directoryId,
        entityId: entity.id,
        moduleId: module.id,
        requestId: 1,
        responseWuId,
        responseContentWuId: 1,
    }
}
