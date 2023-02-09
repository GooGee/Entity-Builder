import { OpenApiBuilder, OpenAPIObject, ReferenceObject } from "openapi3-ts"
import makeMediaType from "./makeMediaType"
import makeParameter from "./makeParameter"
import makePath, {
    ModuleActionResponseWithName,
    ModuleActionWithMethod,
} from "./makePath"
import { makeReferenceOf, ComponentKind } from "./makeReference"
import makeSchemaEnum, { makeSchemaEnumName } from "./makeSchemaEnum"
import makeSchemaTypeFormat from "./makeSchemaTypeFormat"
import makeSchemaWu from "./makeSchemaWu"
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

    const entityMap = new Map(db.tables.Entity.map((item) => [item.id, item]))
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

    // for path
    const pipzzm: Map<number, LB.Column[]> = new Map()
    // for response
    const ripzzm: Map<number, LB.Column[]> = new Map()
    // for request
    const maipzzm: Map<number, LB.Column[]> = new Map()
    db.tables.ParameterMap.forEach((item) => {
        if (item.pathId) {
            add(pipzzm, item, item.pathId)
            return
        }
        if (item.requestId) {
            add(maipzzm, item, item.requestId)
            return
        }
        if (item.responseId) {
            add(ripzzm, item, item.responseId)
            return
        }
    })

    function add(
        map: Map<number, LB.Column[]>,
        item: LB.ParameterMap,
        targetId: number,
    ) {
        let found = map.get(targetId)
        if (found === undefined) {
            found = []
            map.set(targetId, found)
        }
        const parameter = cicm.get(item.columnId)
        if (parameter) {
            found.push(parameter)
        }
    }

    const riezzm: Map<string, LB.Example[]> = new Map()
    db.tables.ExampleMap.forEach((item) => {
        const key = item.requestId ? "rb" + item.requestId : "r" + item.responseId
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

    db.tables.ParameterMap.forEach((item) => {
        const column = cicm.get(item.columnId)
        if (column === undefined) {
            return
        }

        makeParameter(
            item,
            column,
            entityMap,
            builder,
            makeSchemaTypeFormat(
                column.tf,
                vivm,
                wiczzm,
                wiwczzm,
                wiwm,
                wiwpzzm,
                [],
                new Map(),
            ) as any,
        )
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
                old[item.name] = makeReferenceOf(item.name, ComponentKind.headers)
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

    const sism: Map<number, LB.Server> = new Map()
    db.tables.Server.forEach((item) => {
        sism.set(item.id, item)
        if (item.global) {
            builder.addServer(makeServer(item, sivzzm))
        }
    })

    const pathzz = [...db.tables.Path]
    pathzz.sort((aa, bb) => aa.name.localeCompare(bb.name))
    pathzz.forEach((item) => {
        const found = entityMap.get(item.entityId)
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
            entityMap,
            marzzm,
            maipzzm,
            pipzzm,
            pimazzm,
            rbirbm,
            db.tables.ServerMap,
            sism,
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
