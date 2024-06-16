import { OmitId } from "../dbhelper"
import { makePathCRUD, makePathMethodCRUD } from "../makeCRUD"
import makeSideBarItem from "./makeSideBarItem"
import { ActionMethodMap, HttpMethod } from "@/Model/Oapi"
import Constant from "@/Model/Constant"

function getMethod(name: string): HttpMethod {
    for (const [key, value] of ActionMethodMap.entries()) {
        if (name.includes(key)) {
            return value
        }
    }
    return HttpMethod.patch
}

function makePathParameterString(name: string = Constant.Id) {
    return `/{${name}}`
}

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

export function makePathMethod(item: LB.Path, ma: LB.ModuleAction) {
    return makePathMethodCRUD().create({
        pathId: item.id,
        moduleActionId: ma.id,
        method: getMethod(ma.name),
        middlewarezz: ['auth'],
    })
}

function makePathName(entity: LB.Entity, ma: LB.ModuleAction) {
    const pathName = `/${entity.name}/${ma.name}`
    if (ma.name.includes("One")) {
        return pathName + makePathParameterString()
    }
    return pathName
}

export function makePathOf(
    ma: LB.ModuleAction,
    entity: LB.Entity,
    module: LB.Module,
    itemzz: LB.Path[],
) {
    const name = makePathName(entity, ma)
    const found = itemzz.find(
        (item) => item.moduleId === module.id && item.name === name,
    )
    if (found) {
        return Promise.resolve(found)
    }

    return makePathCRUD().create(makePath(name, entity.id, module.id))
}
