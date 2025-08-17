import lodash from "lodash"
import { OmitId } from "../dbhelper"
import findWrapperWu from "@/Service/findWrapperWu"

export default function makeModuleAction(
    name: string,
    entity: LB.Entity,
    module: LB.Module,
): OmitId<LB.ModuleAction> {
    const responseWuId = findWrapperWu(name) ?? 1
    return {
        deprecated: false,
        inRoute: true,
        name: name,
        description: "",
        routeName: "",
        filezz: [],
        summary: module.name + " " + lodash.lowerCase(name) + " " + entity.name,
        directoryId: module.directoryId,
        entityId: entity.id,
        moduleId: module.id,
        requestId: 1,
        responseWuId,
    }
}
