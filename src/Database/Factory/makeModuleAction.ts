import lodash from "lodash"
import { OmitId } from "../dbhelper"

export default function makeModuleAction(
    directory: LB.Directory,
    entity: LB.Entity,
    module: LB.Module,
): OmitId<LB.ModuleAction> {
    return {
        deprecated: false,
        name: directory.name,
        description: "",
        filezz: [],
        summary:
            module.name + " " + lodash.lowerCase(directory.name) + " " + entity.name,
        operationId: module.name + "_" + directory.name + entity.name,
        directoryId: directory.id,
        entityId: entity.id,
        moduleId: module.id,
        requestId: 1,
    }
}
