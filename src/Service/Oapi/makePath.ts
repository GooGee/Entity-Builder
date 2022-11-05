import { HttpMethod } from "@/Model/Oapi"
import { OperationObject, PathItemObject, ReferenceObject } from "openapi3-ts"
import { ComponentKind, makeReferenceOf } from "./makeReference"
import makeServer from "./makeServer"

export type ModuleActionResponseWithName = LB.ModuleActionResponse & { name: string }

export type ModuleActionWithMethod = LB.ModuleAction & { method: string }

interface Item {
    id: number
}

export default function makePath(
    item: LB.Path,
    marzzm: Map<number, ModuleActionResponseWithName[]>,
    maipzzm: Map<number, LB.Parameter[]>,
    pipzzm: Map<number, LB.Parameter[]>,
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
            makeReferenceOf(item.name2, ComponentKind.parameters),
        ),
        summary: item.summary,
    }

    const serverzz = makeServerzz(item, smzz, sism, sivzzm, true)
    if (serverzz.length) {
        path.servers = serverzz
    }

    const mazz = pimazzm.get(item.id) ?? []
    const data = mazz.reduce(function (old, item) {
        const rzz = marzzm.get(item.id) ?? []
        const responses = rzz.reduce(function (old, item) {
            old[item.status] = makeReferenceOf(item.name, ComponentKind.responses)
            return old
        }, Object.create(null) as Record<string, ReferenceObject>)
        const data: OperationObject = {
            deprecated: item.deprecated,
            description: item.description,
            parameters: (maipzzm.get(item.id) ?? []).map((item) =>
                makeReferenceOf(item.name, ComponentKind.parameters),
            ),
            responses,
            operationId: item.operationId,
            summary: item.summary,
            tags: [tag],
        }

        const serverzz = makeServerzz(item, smzz, sism, sivzzm, false)
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
}

function makeServerzz(
    item: Item,
    smzz: LB.ServerMap[],
    sism: Map<number, LB.Server>,
    sivzzm: Map<number, LB.Variable[]>,
    forPath: boolean,
) {
    const serverzz = smzz
        .filter((sm) => sm.forPath === forPath && sm.targetId === item.id)
        .map((item) => sism.get(item.serverId)!)
    return serverzz.map((item) => makeServer(item, sivzzm))
}
