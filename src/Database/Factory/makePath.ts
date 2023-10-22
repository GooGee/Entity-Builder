import { getParameterInPath } from "@/Service/getParameter"
import { OmitId } from "../dbhelper"
import { makeParameterMapCRUD, makePathCRUD, makePathMethodCRUD } from "../makeCRUD"
import makeSideBarItem from "./makeSideBarItem"
import { ActionMethodMap, HttpMethod } from "@/Model/Oapi"

function getMethod(name: string) {
    if (name.startsWith("Read")) {
        return HttpMethod.get
    }

    return ActionMethodMap.get(name.slice(0, 6)) ?? HttpMethod.put
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

export function makePathFor(entity: LB.Entity, module: LB.Module, itemzz: LB.Path[]) {
    let name = "/".concat(entity.name)
    if (itemzz.find((item) => item.moduleId === module.id && item.name === name)) {
        name += "/{id}"
    }
    if (itemzz.find((item) => item.moduleId === module.id && item.name === name)) {
        name = "/".concat(entity.name).concat("_Page")
    }
    if (itemzz.find((item) => item.moduleId === module.id && item.name === name)) {
        name = "/".concat(entity.name).concat("_My")
    }
    if (itemzz.find((item) => item.moduleId === module.id && item.name === name)) {
        name = "/".concat(entity.name).concat("/") + new Date().getTime()
    }
    return makePath(name, entity.id, module.id)
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
        return pathName + "/{id}"
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

export function makePathParameter(item: LB.Path) {
    if (item.name.includes("/{id}")) {
        const column = getParameterInPath("id")
        if (column === undefined) {
            return Promise.resolve(null)
        }

        return makeParameterMapCRUD().create({
            alias: "",
            columnId: column.id,
            pathId: item.id,
            requestId: null,
            responseId: null,
        })
    }

    return Promise.resolve(null)
}
