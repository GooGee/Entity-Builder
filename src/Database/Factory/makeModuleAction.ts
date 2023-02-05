import lodash from "lodash"
import { OmitId } from "../dbhelper"

export default function makeModuleAction(
    directoryId: number,
    testDirectoryId: number,
    entity: LB.Entity,
    module: LB.Module,
    action: LB.CollectionItem,
): OmitId<LB.ModuleAction> {
    return {
        deprecated: false,
        description: "",
        summary: module.name + " " + lodash.lowerCase(action.name) + " " + entity.name,
        operationId: module.name + "_" + action.name + entity.name,
        directoryId,
        testDirectoryId,
        entityId: entity.id,
        moduleId: module.id,
        collectionItemId: action.id,
        requestId: 1,
    }
}
