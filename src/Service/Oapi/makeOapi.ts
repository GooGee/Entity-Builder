import {
    HeaderObject,
    OpenApiBuilder,
    OpenAPIObject,
    ReferenceObject,
    ServerVariableObject,
} from "openapi3-ts"
import makeMediaType from "./makeMediaType"
import makePath, {
    ModuleActionResponseWithName,
    ModuleActionWithMethod,
} from "./makePath"
import { ComponentKind, makeReferenceEmpty, makeReferenceOf } from "./makeReference"
import makeSchemaWu from "./makeSchemaWu"
import makeSchemaTypeFormat from "./makeSchemaTypeFormat"
import makeSchemaEnum, { makeSchemaEnumName } from "./makeSchemaEnum"
import makeServer from "./makeServer"

export default function makeOapi(data: OpenAPIObject, db: LB.DBData) {
    const builder = OpenApiBuilder.create({
        ...OpenApiBuilder.create().getSpec(),
        info: data.info,
    })

    const eiem: Map<number, LB.Example> = new Map()
    db.tables.Example.forEach((item) => {
        eiem.set(item.id, item)
        builder.addExample(item.name, {
            description: item.description,
            summary: item.summary,
            value: item.value,
        })
    })

    const cicm = new Map(db.tables.Column.map((item) => [item.id, item]))
    const mimm = new Map(db.tables.Module.map((item) => [item.id, item]))
    const vivm = new Map(db.tables.Variable.map((item) => [item.id, item]))

    db.tables.Variable.forEach((item) =>
        builder.addSchema(makeSchemaEnumName(item.name), makeSchemaEnum(item) as any),
    )

    const wiczzm: Map<number, LB.Column[]> = new Map()
    db.tables.WuColumn.forEach((item) => {
        let found = wiczzm.get(item.wuId)
        if (found === undefined) {
            found = []
            wiczzm.set(item.wuId, found)
        }

        const column = cicm.get(item.columnId)!
        let name = column.name
        if (item.alias) {
            name = item.alias
        }
        found.push({ ...column, name })
    })

    const wiwm = new Map(db.tables.Wu.map((item) => [item.id, item]))

    const wiwczzm: Map<number, LB.WuChild[]> = new Map()
    db.tables.WuChild.forEach((item) => {
        let found = wiwczzm.get(item.wuId)
        if (found === undefined) {
            found = []
            wiwczzm.set(item.wuId, found)
        }
        found.push(item)
    })

    const wiwpzzm: Map<number, LB.WuParameter[]> = new Map()
    db.tables.WuParameter.forEach((item) => {
        let found = wiwpzzm.get(item.wuId)
        if (found === undefined) {
            found = []
            wiwpzzm.set(item.wuId, found)
        }

        found.push(item)
    })

    const pipm = new Map(db.tables.Parameter.map((item) => [item.id, item]))

    // for path
    const pipzzm: Map<number, LB.Parameter[]> = new Map()
    // for response
    const ripzzm: Map<number, LB.Parameter[]> = new Map()
    // for action
    const maipzzm: Map<number, LB.Parameter[]> = new Map()
    db.tables.ParameterMap.forEach((item) => {
        if (item.inPath) {
            add(pipzzm, item)
            return
        }
        if (item.inResponse) {
            add(ripzzm, item)
            return
        }
        add(maipzzm, item)
    })

    function add(map: Map<number, LB.Parameter[]>, item: LB.ParameterMap) {
        let found = map.get(item.targetId)
        if (found === undefined) {
            found = []
            map.set(item.targetId, found)
        }
        const parameter = pipm.get(item.parameterId)
        if (parameter) {
            found.push(parameter)
        }
    }

    const riezzm: Map<string, LB.Example[]> = new Map()
    db.tables.ExampleMap.forEach((item) => {
        const key = (item.isRequest ? "rb" : "r") + item.targetId
        let found = riezzm.get(key)
        if (found === undefined) {
            found = []
            riezzm.set(key, found)
        }

        const example = eiem.get(item.exampleId)
        if (example) {
            found.push(example)
        }
    })

    db.tables.Wu.forEach((wu) => {
        const wpzz = wiwpzzm.get(wu.id) ?? []
        if (wpzz.length) {
            return
        }

        builder.addSchema(wu.name, makeSchemaWu(wu, vivm, wiczzm, wiwczzm, wiwm) as any)
    })

    db.tables.Parameter.forEach((item) => {
        const data: HeaderObject = {
            allowEmptyValue: item.allowEmptyValue,
            allowReserved: item.allowReserved,
            deprecated: item.deprecated,
            description: item.description,
            example: item.example,
            explode: item.explode,
            required: item.required,
            schema: makeSchemaTypeFormat(
                item.tf,
                vivm,
                wiczzm,
                wiwczzm,
                wiwm,
                wiwpzzm,
                [],
                new Map(),
            ) as any,
        }
        if (item.in === "header") {
            builder.addHeader(item.name, data)
            return
        }

        builder.addParameter(item.name, {
            ...data,
            name: item.name2,
            in: item.in as "path",
        })
    })

    db.tables.Request.forEach((item) => {
        builder.addRequestBody(item.name, {
            content: {
                [item.mediaType]: makeMediaType(
                    item,
                    vivm,
                    riezzm,
                    wiczzm,
                    wiwczzm,
                    wiwm,
                    wiwpzzm,
                ),
            },
            description: item.description,
            required: item.required,
        })
    })

    db.tables.Response.forEach((item) => {
        builder.addResponse(item.name, {
            content: {
                [item.mediaType]: makeMediaType(
                    item,
                    vivm,
                    riezzm,
                    wiczzm,
                    wiwczzm,
                    wiwm,
                    wiwpzzm,
                ),
            },
            description: item.description,
            headers: (ripzzm.get(item.id) ?? []).reduce(function (old, item) {
                old[item.name2] = makeReferenceOf(item.name, ComponentKind.headers)
                return old
            }, Object.create(null) as Record<string, ReferenceObject>),
        })
    })

    const rbirbm = new Map(db.tables.Request.map((item) => [item.id, item]))

    const rirm = new Map(db.tables.Response.map((item) => [item.id, item]))

    const marzzm: Map<number, ModuleActionResponseWithName[]> = new Map()
    db.tables.ModuleActionResponse.forEach((item) => {
        let found = marzzm.get(item.moduleActionId)
        if (found === undefined) {
            found = []
            marzzm.set(item.moduleActionId, found)
        }
        const response = rirm.get(item.responseId)
        if (response) {
            found.push({ ...item, name: response.name })
        }
    })

    const maimam = new Map(db.tables.ModuleAction.map((item) => [item.id, item]))

    const pimazzm: Map<number, ModuleActionWithMethod[]> = new Map()
    db.tables.PathMethod.forEach((item) => {
        let found = pimazzm.get(item.pathId)
        if (found === undefined) {
            found = []
            pimazzm.set(item.pathId, found)
        }
        const ma = maimam.get(item.moduleActionId)
        if (ma) {
            found.push({ ...ma, method: item.method })
        }
    })

    const tagSet: Set<string> = new Set()
    const sism = new Map(db.tables.Entity.map((item) => [item.id, item]))

    const sivzzm: Map<number, LB.Variable[]> = new Map()
    db.tables.ServerVariable.forEach((item) => {
        let found = sivzzm.get(item.serverId)
        if (found === undefined) {
            found = []
            sivzzm.set(item.serverId, found)
        }
        const vv = vivm.get(item.variableId)
        if (vv) {
            found.push(vv)
        }
    })

    const serverMap: Map<number, LB.Server> = new Map()
    db.tables.Server.forEach((item) => {
        serverMap.set(item.id, item)
        if (item.global) {
            builder.addServer(makeServer(item, sivzzm))
        }
    })

    const pathzz = [...db.tables.Path]
    pathzz.sort((aa, bb) => aa.name.localeCompare(bb.name))
    pathzz.forEach((item) => {
        const found = sism.get(item.entityId)
        if (found) {
            if (tagSet.has(found.name)) {
                // skip
            } else {
                tagSet.add(found.name)
                builder.addTag({ name: found.name })
            }
        }
        const data = makePath(
            item,
            marzzm,
            maipzzm,
            pipzzm,
            pimazzm,
            rbirbm,
            db.tables.ServerMap,
            serverMap,
            sivzzm,
            found?.name ?? "not found",
        )

        let name = item.name
        const module = mimm.get(item.moduleId)
        if (module) {
            name = module.prefix + name
        }
        builder.addPath(name, data)
    })

    return builder
}
