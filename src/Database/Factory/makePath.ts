import { OmitId } from "../dbhelper"
import makeSideBarItem from "./makeSideBarItem"

export default function makePath(
    name: string,
    schemaId: number,
    moduleId: number,
): OmitId<LB.Path> {
    return {
        ...makeSideBarItem(name),
        moduleId,
        schemaId,
        description: "",
        summary: "",
    }
}

export function makePathFor(schema: LB.Schema, module: LB.Module, itemzz: LB.Path[]) {
    let name = "/".concat(schema.name)
    if (itemzz.find((item) => item.moduleId === module.id && item.name === name)) {
        name += "/{id}"
    }
    if (itemzz.find((item) => item.moduleId === module.id && item.name === name)) {
        name = "/".concat(schema.name).concat("/") + new Date().getTime()
    }
    return makePath(name, schema.id, module.id)
}
