import { HttpMethod } from "@/Model/Oapi"
import { OperationObject, PathItemObject, ReferenceObject } from "openapi3-ts"
import { makeParameterReference } from "./makeParameter"
import { ComponentKind, makeReferenceOf } from "./makeReference"
import makeServer from "./makeServer"

export type ModuleActionResponseWithName = LB.ModuleActionResponse & { name: string }

export type ModuleActionWithMethod = LB.ModuleAction & { method: string }

export default function makePath(
    item: LB.Path,
    eiem: Map<number, LB.Entity>,
    marzzm: Map<number, ModuleActionResponseWithName[]>,
    maipzzm: Map<number, LB.Column[]>,
    pipzzm: Map<number, LB.Column[]>,
    pimazzm: Map<number, ModuleActionWithMethod[]>,
    rbirbm: Map<number, LB.Request>,
    smzz: LB.ServerMap[],
    sism: Map<number, LB.Server>,
    sivzzm: Map<number, LB.Variable[]>,
    tag: string,
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

    const mazz = pimazzm.get(item.id) ?? []
    const ozz = mazz.filter((item) => (marzzm.get(item.id) ?? []).length)
    if (ozz.length === 0) {
        return null
    }

    const data = ozz.reduce(function (old, item) {
        const rzz = marzzm.get(item.id) ?? []
        if (rzz.length === 0) {
            return old
        }

        const responses = rzz.reduce(function (old, item) {
            old[item.status] = makeReferenceOf(item.name, ComponentKind.responses)
            return old
        }, Object.create(null) as Record<string, ReferenceObject>)
        const data: OperationObject = {
            deprecated: item.deprecated,
            description: item.description,
            parameters: (maipzzm.get(item.requestId) ?? []).map((item) =>
                makeParameterReference(item, eiem),
            ),
            responses,
            operationId: item.operationId,
            summary: item.summary,
            tags: [tag],
        }

        const serverzz = makeServerzz(item.requestId, 1)
        if (serverzz.length) {
            data.servers = serverzz
        }

        const method = item.method as keyof typeof HttpMethod
        old[method] = data
        if (["get", "delete"].includes(item.method)) {
            return old
        }

        // empty
        if (item.requestId === 1) {
            return old
        }

        const request = rbirbm.get(item.requestId)!
        data.requestBody = makeReferenceOf(request.name, ComponentKind.requestBodies)
        return old
    }, path)
    return data

    function makeServerzz(requestId: number, pathId: number) {
        const serverzz = smzz
            .filter((item) => item.requestId === requestId && item.pathId === pathId)
            .map((item) => sism.get(item.serverId)!)
        return serverzz.map((item) => makeServer(item, sivzzm))
    }
}
