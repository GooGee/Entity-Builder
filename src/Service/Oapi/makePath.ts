import lodash from "lodash"
import { HttpMethod } from "@/Model/Oapi"
import { OperationObject, PathItemObject, ReferenceObject } from "openapi3-ts"
import { makeParameterReference } from "./makeParameter"
import { ComponentKind, makeReferenceOf } from "./makeReference"
import makeServer from "./makeServer"

export type ModuleActionResponseWithName = LB.ModuleActionResponse & { name: string }

export type ModuleActionWithMethod = LB.ModuleAction & { method: string }

export default function makePath(
    item: LB.Path,
    mimm: Map<number, LB.Module>,
    eiem: Map<number, LB.Entity>,
    marzzm: Map<number, ModuleActionResponseWithName[]>,
    maipzzm: Map<number, LB.Column[]>,
    pipzzm: Map<number, LB.Column[]>,
    rbirbm: Map<number, LB.Request>,
    smzz: LB.ServerMap[],
    sism: Map<number, LB.Server>,
    sivzzm: Map<number, LB.Variable[]>,
    maimam: Map<number, LB.ModuleAction>,
) {
    const path: PathItemObject = {
        description: item.description,
        parameters: (pipzzm.get(item.id) ?? []).map((item) =>
            makeParameterReference(item, eiem),
        ),
        summary: item.summary,
    }

    const serverzz = makeServerzz(1, item.id)
    if (serverzz.length) {
        path.servers = serverzz
    }

    const ma = maimam.get(item.moduleActionId)
    if (ma == null) {
        return null
    }
    if (marzzm.has(item.moduleActionId) === false) {
        return null
    }

    const rzz = marzzm.get(ma.id) ?? []
    if (rzz.length === 0) {
        return path
    }

    const responses = rzz.reduce(function (old, item) {
        old[item.status] = makeReferenceOf(item.name, ComponentKind.responses)
        return old
    }, Object.create(null) as Record<string, ReferenceObject>)
    const module = mimm.get(ma.moduleId)!
    const entity = eiem.get(ma.entityId)!
    const data: OperationObject = {
        deprecated: ma.deprecated,
        description: ma.description,
        parameters: (maipzzm.get(ma.requestId) ?? []).map((item) =>
            makeParameterReference(item, eiem),
        ),
        responses,
        operationId: module.name + "_" + ma.name + "_" + entity.name,
        summary: ma.summary.length ? ma.summary : makeSummart(module, ma, entity),
        tags: [module.name, entity.name],
    }

    const method = item.method as keyof typeof HttpMethod
    path[method] = data
    if (["get", "delete"].includes(item.method)) {
        return path
    }

    // empty
    if (ma.requestId === 1) {
        return path
    }

    const request = rbirbm.get(ma.requestId)!
    data.requestBody = makeReferenceOf(request.name, ComponentKind.requestBodies)
    return path

    function makeServerzz(requestId: number, pathId: number) {
        return smzz
            .filter((item) => item.requestId === requestId && item.pathId === pathId)
            .map((item) => {
                const server = sism.get(item.serverId)!
                return makeServer(server, sivzzm)
            })
    }
}

function makeSummart(module: LB.Module, ma: LB.ModuleAction, entity: LB.Entity) {
    return module.name + " " + lodash.lowerCase(ma.name) + " " + entity.name
}
