import { makeChildzzMap, makeIdItemMap, makeNameItemMap } from "@/Factory/makeMap"
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
import { makeResponseName } from "../makeName"
import makeResponse from "@/Database/Factory/makeResponse"
import makeModuleActionResponse from "@/Database/Factory/makeModuleActionResponse"
import makeWu from "@/Database/Factory/makeWu"
import makeTypeFormat from "@/Database/Factory/makeTypeFormat"
import { OapiType } from "@/Model/Oapi"

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

    db.tables.Variable.forEach((item) =>
        builder.addSchema(makeSchemaEnumName(item.name), makeSchemaEnum(item) as any),
    )


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

    const WuId_Wu_map = makeIdItemMap(db.tables.Wu)
    const WuName_Wu_map = makeNameItemMap(db.tables.Wu)

    let bigId = 111_222_333
    let wcid = bigId
    const EntityId_Columnzz_map: Map<number, LB.Column[]> = new Map()
    const maimam = makeIdItemMap(db.tables.ModuleAction)
    const ModuleActionId_ModuleActionResponse_map: Map<number, LB.ModuleActionResponse> = makeIdItemMap(db.tables.ModuleActionResponse)
    const ResponseNameSet = new Set(db.tables.Response.map((item) => item.name))
    const WuId_WuParameter_map = new Map<number, LB.WuParameter>()

    db.tables.Column.forEach((item) => {
        let found = EntityId_Columnzz_map.get(item.entityId)
        if (found === undefined) {
            found = []
            EntityId_Columnzz_map.set(item.entityId, found)
        }
        found.push(item)
    })

    db.tables.WuParameter.forEach((item) => {
        let found = WuId_WuParameter_map.get(item.wuId)
        if (found === undefined) {
            found = item
            WuId_WuParameter_map.set(item.wuId, found)
        }
    })

    db.tables.Path.forEach(function (item) {
        const ma = maimam.get(item.moduleActionId)
        if (ma == null) {
            return
        }
        if (ma.inRoute === false) {
            return
        }
        if (ModuleActionId_ModuleActionResponse_map.has(item.moduleActionId)) {
            return
        }
        const entity = entityMap.get(ma.entityId)
        if (entity == null) {
            return
        }

        const name = makeResponseName(ma.name, entity)
        if (ResponseNameSet.has(name)) {
            return
        }

        const wrapper = WuId_Wu_map.get(ma.responseWuId)
        if (wrapper == null) {
            return
        }

        let wu = WuName_Wu_map.get(entity.name)
        if (wu == null) {
            wu = makeWu(entity.name, entity.id)
            wu.id = bigId
            db.tables.Wu.push(wu)
            WuId_Wu_map.set(wu.id, wu)
            WuName_Wu_map.set(entity.name, wu)
            
            const czz = EntityId_Columnzz_map.get(entity.id) ?? []
            czz.filter((item) => item.inTable && item.hidden === false)
                .forEach((item) => {
                    db.tables.WuColumn.push({
                        wuId: wu.id,
                        columnId: item.id,
                        alias: "",
                        id: wcid,
                    })
                    wcid += 1
                })
        }

        const response: LB.Response = makeResponse(name)
        response.id = bigId
        db.tables.Response.push(response)
        ResponseNameSet.add(name)

        const tf: LB.TypeFormat = makeTypeFormat(OapiType.Wu, wrapper.id)
        tf.id = bigId
        tf.ownerResponseId = response.id
        db.tables.TypeFormat.push(tf)

        const wp = WuId_WuParameter_map.get(wrapper.id)
        if (wp && wp.isWu) {
            const wptf: LB.TypeFormat = makeTypeFormat(
                OapiType.Wu,
                wu.id,
                null,
                null,
                tf.id,
                wp.id,
            )
            wptf.id = bigId + 111_000_000
            db.tables.TypeFormat.push(wptf)
        }

        const mar: LB.ModuleActionResponse = makeModuleActionResponse('200', ma.id, response.id)
        mar.id = bigId
        db.tables.ModuleActionResponse.push(mar)
        ModuleActionId_ModuleActionResponse_map.set(ma.id, mar)

        bigId += 1
    })

    const tfzz = db.tables.TypeFormat
    const tfzzm: Map<number, LB.TypeFormat[]> = makeChildzzMap(
        db.tables.TypeFormat,
        "ownerId",
    )

    const wiwkzzm: Map<number, LB.TypeFormat[]> = makeChildzzMap(
        db.tables.TypeFormat,
        "ownerWuChildId",
    )
    const wiwpzzm: Map<number, LB.WuParameter[]> = makeChildzzMap(
        db.tables.WuParameter,
        "wuId",
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

    db.tables.Wu.forEach((wu) => {
        const wpzz = wiwpzzm.get(wu.id) ?? []
        if (wpzz.length) {
            return
        }

        builder.addSchema(
            wu.name,
            makeSchemaWu(wu, tfzz, tfzzm, vivm, wiczzm, wiwkzzm, WuId_Wu_map) as any,
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
                WuId_Wu_map,
                wiwpzzm,
                [],
                new Map(),
            ) as any,
        )
    })

    // for path
    const pipzzm: Map<number, LB.Column[]> = new Map()
    // for response
    const ripzzm: Map<number, LB.Column[]> = new Map()
    // for request
    const maipzzm: Map<number, LB.Column[]> = new Map()
    db.tables.ParameterMap.forEach((item) => {
        if (item.pathId) {
            addColumn(pipzzm, item, item.pathId)
            return
        }
        if (item.requestId) {
            addColumn(maipzzm, item, item.requestId)
            return
        }
        if (item.responseId) {
            addColumn(ripzzm, item, item.responseId)
            return
        }
    })

    function addColumn(
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
                    WuId_Wu_map,
                    wiwpzzm,
                ),
            },
            description: item.description,
            required: item.required,
        })
    })

    function addResponse(item: LB.Response) {
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
                    WuId_Wu_map,
                    wiwpzzm,
                ),
            },
            description: item.description,
            headers: (ripzzm.get(item.id) ?? []).reduce(function (old, item) {
                old[item.name] = makeReferenceOf(item.name, ComponentKind.headers)
                return old
            }, Object.create(null) as Record<string, ReferenceObject>),
        })
    }

    db.tables.Response.forEach(addResponse)

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

    db.tables.Path.sort((aa, bb) => aa.name.localeCompare(bb.name))
    db.tables.Path.forEach((item) => {
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
