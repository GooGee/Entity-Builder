import { OmitId } from "../dbhelper"
import makeSideBarItem from "./makeSideBarItem"

export default function makePath(
    name: string,
    entityId: number,
    moduleId: number,
): OmitId<LB.Path> {
    return {
        ...makeSideBarItem(name),
        moduleId,
        entityId,
        description: "",
        summary: "",
    }
}

export function makePathFor(entity: LB.Entity, module: LB.Module, itemzz: LB.Path[]) {
    let name = "/".concat(entity.name)
    if (itemzz.find((item) => item.moduleId === module.id && item.name === name)) {
        name += "/{id}"
    }
    if (itemzz.find((item) => item.moduleId === module.id && item.name === name)) {
        name = "/".concat(entity.name).concat("/") + new Date().getTime()
    }
    return makePath(name, entity.id, module.id)
}
