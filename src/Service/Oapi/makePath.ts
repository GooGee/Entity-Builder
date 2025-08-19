import lodash from "lodash"
import { HttpMethod } from "@/Model/Oapi"
import { OperationObject, PathItemObject, ReferenceObject } from "openapi3-ts"
import { makeParameterReference } from "./makeParameter"
import { ComponentKind, makeReferenceOf } from "./makeReference"
import makeServer from "./makeServer"
import { OapiDto } from "./prepareOapiDto"

export default function makePath(
    item: LB.Path,
    od: OapiDto,
    smzz: LB.ServerMap[],
) {
    const path: PathItemObject = {
        description: item.description,
        parameters: (od.PathId_Columnzz_map.get(item.id) ?? []).map((item) =>
            makeParameterReference(item, od.Entity_map),
        ),
        summary: item.summary,
    }

    const serverzz = makeServerzz(1, item.id)
    if (serverzz.length) {
        path.servers = serverzz
    }

    const ma = od.ModuleAction_map.get(item.moduleActionId)
    if (ma == null) {
        return null
    }
    if (od.ModuleActionId_ModuleActionResponsezz_map.has(item.moduleActionId) === false) {
        return null
    }

    const rzz = od.ModuleActionId_ModuleActionResponsezz_map.get(ma.id) ?? []
    if (rzz.length === 0) {
        return path
    }

    const responses = rzz.reduce(function (old, item) {
        old[item.status] = makeReferenceOf(item.name, ComponentKind.responses)
        return old
    }, Object.create(null) as Record<string, ReferenceObject>)
    const module = od.Module_map.get(ma.moduleId)!
    const entity = od.Entity_map.get(ma.entityId)!
    const data: OperationObject = {
        deprecated: ma.deprecated,
        description: ma.description,
        parameters: (od.RequestId_Columnzz_map.get(ma.requestId) ?? []).map((item) => makeParameterReference(item, od.Entity_map)),
        responses,
        operationId: module.name + "_" + ma.name + "_" + entity.name,
        summary: ma.summary.length ? ma.summary : makeSummart(module, ma, entity),
        tags: [module.name, entity.name],
    }

    const method = item.method as keyof typeof HttpMethod
    path[method] = data

    // empty
    if (ma.requestId === 1) {
        return path
    }
    if (method === HttpMethod.delete) {
        return path
    }
    if (method === HttpMethod.get) {
        return path
    }

    const request = od.Request_map.get(ma.requestId)!
    data.requestBody = makeReferenceOf(request.name, ComponentKind.requestBodies)
    return path

    function makeServerzz(requestId: number, pathId: number) {
        return smzz
            .filter((item) => item.requestId === requestId && item.pathId === pathId)
            .map((item) => {
                const server = od.Server_map.get(item.serverId)!
                return makeServer(server, od.ServerId_Variablezz_map)
            })
    }
}

function makeSummart(module: LB.Module, ma: LB.ModuleAction, entity: LB.Entity) {
    return module.name + " " + lodash.lowerCase(ma.name) + " " + entity.name
}
