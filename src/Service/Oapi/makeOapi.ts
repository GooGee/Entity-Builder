import { makeChildzzMap, makeIdItemMap } from "@/Factory/makeMap"
import { OpenApiBuilder, OpenAPIObject, ReferenceObject } from "openapi3-ts"
import getTypeFormatOrThrow from "../getTypeFormatOrThrow"
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
        externalDocs: data.externalDocs,
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

    const entityMap = makeIdItemMap(db.tables.Entity)
    const cicm = makeIdItemMap(db.tables.Column)
    const mimm = makeIdItemMap(db.tables.Module)
    const vivm = makeIdItemMap(db.tables.Variable)

    const tfzz = db.tables.TypeFormat
    const tfzzm: Map<number, LB.TypeFormat[]> = makeChildzzMap(
        db.tables.TypeFormat,
        "ownerId",
    )

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

    const wiwm = makeIdItemMap(db.tables.Wu)

    const wiwkzzm: Map<number, LB.TypeFormat[]> = makeChildzzMap(
        db.tables.TypeFormat,
        "ownerWuChildId",
    )
    const wiwpzzm: Map<number, LB.WuParameter[]> = makeChildzzMap(
        db.tables.WuParameter,
        "wuId",
    )

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

        builder.addSchema(
            wu.name,
            makeSchemaWu(wu, tfzz, tfzzm, vivm, wiczzm, wiwkzzm, wiwm) as any,
        )
    })

    db.tables.ParameterMap.forEach((item) => {
        const column = cicm.get(item.columnId)
        if (column === undefined) {
            return
        }

        const tf = getTypeFormatOrThrow(column.id, "ownerColumnId", tfzz)

        makeParameter(
            item,
            column,
            entityMap,
            builder,
            makeSchemaTypeFormat(
                tf,
                tfzz,
                tfzzm,
                vivm,
                wiczzm,
                wiwkzzm,
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
                    tfzz,
                    tfzzm,
                    vivm,
                    riezzm,
                    wiczzm,
                    wiwkzzm,
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
                    tfzz,
                    tfzzm,
                    vivm,
                    riezzm,
                    wiczzm,
                    wiwkzzm,
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

    const rbirbm = makeIdItemMap(db.tables.Request)

    const rirm = makeIdItemMap(db.tables.Response)

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

    const maimam = makeIdItemMap(db.tables.ModuleAction)

    const pimazzm: Map<number, ModuleActionWithMethod[]> = new Map()

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

    const tagSet: Set<string> = new Set()

    const pathzz = [...db.tables.Path]
    pathzz.sort((aa, bb) => aa.name.localeCompare(bb.name))
    pathzz.forEach((item) => {
        const found = entityMap.get(item.entityId)
        const data = makePath(
            item,
            mimm,
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
            maimam,
        )
        if (data === null) {
            return
        }

        if (found) {
            tagSet.add(found.name)
        }

        builder.addPath(item.name, data)
    })

    Array.from(tagSet)
        .sort((aa, bb) => aa.localeCompare(bb))
        .forEach((name) => builder.addTag({ name }))

    return builder
}
