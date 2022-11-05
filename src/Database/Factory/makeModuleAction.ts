import lodash from "lodash"
import { OmitId } from "../dbhelper"

export default function makeModuleAction(
    directoryId: number,
    testDirectoryId: number,
    schema: LB.Schema,
    module: LB.Module,
    action: LB.CollectionItem,
): OmitId<LB.ModuleAction> {
    return {
        deprecated: false,
        description: "",
        summary: module.name + " " + lodash.lowerCase(action.name) + " " + schema.name,
        operationId: module.name + "_" + action.name + schema.name,
        directoryId,
        testDirectoryId,
        schemaId: schema.id,
        moduleId: module.id,
        collectionItemId: action.id,
        requestId: 1,
    }
}
