import { makeChildzzMap, makeIdItemMap, makeNameItemMap } from "@/Factory/makeMap"
import { ModuleActionResponseWithName } from "./makePath"
import makeModuleActionResponse from "@/Database/Factory/makeModuleActionResponse"
import makeResponse from "@/Database/Factory/makeResponse"
import makeTypeFormat from "@/Database/Factory/makeTypeFormat"
import makeWu from "@/Database/Factory/makeWu"
import { OapiType } from "@/Model/Oapi"
import { makeResponseName } from "../makeName"

export type OapiDate = {
    Entity_map: Map<number, LB.Entity>
    Column_map: Map<number, LB.Column>
    Module_map: Map<number, LB.Module>
    ModuleAction_map: Map<number, LB.ModuleAction>
    ModuleActionResponse_map: Map<number, LB.ModuleActionResponse>
    Request_map: Map<number, LB.Request>
    Response_map: Map<number, LB.Response>
    Server_map: Map<number, LB.Server>
    Variable_map: Map<number, LB.Variable>
    Wu_map: Map<number, LB.Wu>
    EntityId_Columnzz_map: Map<number, LB.Column[]>
    WuId_Columnzz_map: Map<number, LB.Column[]>
    WuId_WuParameter_map: Map<number, LB.WuParameter>
    ServerId_Variablezz_map: Map<number, LB.Variable[]>
    TypeFormatChildzz_map: Map<number, LB.TypeFormat[]>
    WuId_WuParameterzz_map: Map<number, LB.WuParameter[]>
    WuId_TypeFormatzz_map: Map<number, LB.TypeFormat[]>
    ModuleActionId_ModuleActionResponseWithNamezz_map: Map<number, ModuleActionResponseWithName[]>
    PathId_Columnzz_map: Map<number, LB.Column[]>
    RequestId_Columnzz_map: Map<number, LB.Column[]>
    ResponseId_Columnzz_map: Map<number, LB.Column[]>
}

let bigId = 111_222_333
let wcid = bigId

function makeAllWuColumn(
    tables: LB.DBTable,
    entity: LB.Entity,
    EntityId_Columnzz_map: Map<number, LB.Column[]>,
    wu: LB.Wu,
) {
    const czz = EntityId_Columnzz_map.get(entity.id) ?? []
    czz.filter((item) => item.inTable && item.hidden === false)
        .forEach((item) => {
            tables.WuColumn.push({
                wuId: wu.id,
                columnId: item.id,
                alias: "",
                id: wcid,
            })
            wcid += 1
        })
}

function prepare(
    moduleId: number,
    tables: LB.DBTable,
    Entity_map: Map<number, LB.Entity>,
    EntityId_Columnzz_map: Map<number, LB.Column[]>,
    ModuleAction_map: Map<number, LB.ModuleAction>,
    ModuleActionResponse_map: Map<number, LB.ModuleActionResponse>,
    Response_map: Map<number, LB.Response>,
    Wu_map: Map<number, LB.Wu>,
    WuId_WuParameter_map: Map<number, LB.WuParameter>,
) {

    const ResponseNameSet = new Set(tables.Response.map((item) => item.name))
    const WuName_Wu_map = makeNameItemMap(tables.Wu)

    tables.Path.forEach(function (path) {
        if (moduleId && path.moduleId !== moduleId) {
            return
        }
        const ma = ModuleAction_map.get(path.moduleActionId)
        if (ma == null) {
            return
        }
        if (ModuleActionResponse_map.has(path.moduleActionId)) {
            return
        }
        const entity = Entity_map.get(ma.entityId)
        if (entity == null) {
            return
        }
        if (entity.id === 1) {
            return
        }

        const name = makeResponseName(ma.name, entity)
        if (ResponseNameSet.has(name)) {
            return
        }

        const wrapper = Wu_map.get(ma.responseWuId)
        if (wrapper == null) {
            return
        }

        let wu = WuName_Wu_map.get(entity.name)
        if (wu == null) {
            wu = makeWu(entity.name, entity.id) as LB.Wu
            wu.id = bigId
            tables.Wu.push(wu)
            Wu_map.set(wu.id, wu)
            WuName_Wu_map.set(entity.name, wu)

            makeAllWuColumn(tables, entity, EntityId_Columnzz_map, wu)
        } else {
            const wc = tables.WuColumn.find((item) => item.wuId === wu!.id)
            if (wc == null) {
                makeAllWuColumn(tables, entity, EntityId_Columnzz_map, wu)
            }
        }

        const response = makeResponse(name) as LB.Response
        response.id = bigId
        tables.Response.push(response)
        Response_map.set(response.id, response)
        ResponseNameSet.add(name)

        const tf = makeTypeFormat(OapiType.Wu, wrapper.id) as LB.TypeFormat
        tf.id = bigId
        tf.ownerResponseId = response.id
        tables.TypeFormat.push(tf)

        const wp = WuId_WuParameter_map.get(wrapper.id)
        if (wp && wp.isWu) {
            const wptf = makeTypeFormat(
                OapiType.Wu,
                wu.id,
                null,
                null,
                tf.id,
                wp.id,
            ) as LB.TypeFormat
            wptf.id = bigId + 111_000_000
            tables.TypeFormat.push(wptf)
        }

        const mar = makeModuleActionResponse('200', ma.id, response.id) as LB.ModuleActionResponse
        mar.id = bigId
        tables.ModuleActionResponse.push(mar)
        ModuleActionResponse_map.set(ma.id, mar)

        bigId += 1
    })

}

export default function prepareOapi(moduleId: number, tables: LB.DBTable) {

    const Entity_map = makeIdItemMap(tables.Entity)
    const Column_map = makeIdItemMap(tables.Column)
    const Module_map = makeIdItemMap(tables.Module)
    const ModuleAction_map = makeIdItemMap(tables.ModuleAction)
    const ModuleActionResponse_map = makeIdItemMap(tables.ModuleActionResponse)
    const Request_map = makeIdItemMap(tables.Request)
    const Response_map = makeIdItemMap(tables.Response)
    const Server_map: Map<number, LB.Server> = new Map()
    const Variable_map = makeIdItemMap(tables.Variable)
    const Wu_map = makeIdItemMap(tables.Wu)

    const EntityId_Columnzz_map: Map<number, LB.Column[]> = new Map()
    tables.Column.forEach((item) => {
        let found = EntityId_Columnzz_map.get(item.entityId)
        if (found === undefined) {
            found = []
            EntityId_Columnzz_map.set(item.entityId, found)
        }
        found.push(item)
    })

    const WuId_WuParameter_map = new Map<number, LB.WuParameter>()
    tables.WuParameter.forEach((item) => {
        let found = WuId_WuParameter_map.get(item.wuId)
        if (found === undefined) {
            found = item
            WuId_WuParameter_map.set(item.wuId, found)
        }
    })

    prepare(
        moduleId,
        tables,
        Entity_map,
        EntityId_Columnzz_map,
        ModuleAction_map,
        ModuleActionResponse_map,
        Response_map,
        Wu_map,
        WuId_WuParameter_map,
    )

    const WuId_Columnzz_map: Map<number, LB.Column[]> = new Map()
    tables.WuColumn.forEach((item) => {
        let found = WuId_Columnzz_map.get(item.wuId)
        if (found === undefined) {
            found = []
            WuId_Columnzz_map.set(item.wuId, found)
        }

        const column = Column_map.get(item.columnId)!
        let name = column.name
        if (item.alias) {
            name = item.alias
        }
        found.push({ ...column, name })
    })

    const ServerId_Variablezz_map: Map<number, LB.Variable[]> = new Map()
    tables.ServerVariable.forEach((item) => {
        let found = ServerId_Variablezz_map.get(item.serverId)
        if (found === undefined) {
            found = []
            ServerId_Variablezz_map.set(item.serverId, found)
        }
        const vv = Variable_map.get(item.variableId)
        if (vv) {
            found.push(vv)
        }
    })

    const TypeFormatChildzz_map: Map<number, LB.TypeFormat[]> = makeChildzzMap(
        tables.TypeFormat,
        "ownerId",
    )

    const WuId_WuParameterzz_map: Map<number, LB.WuParameter[]> = makeChildzzMap(
        tables.WuParameter,
        "wuId",
    )

    const WuId_TypeFormatzz_map: Map<number, LB.TypeFormat[]> = makeChildzzMap(
        tables.TypeFormat,
        "ownerWuChildId",
    )

    const ModuleActionId_ModuleActionResponseWithNamezz_map: Map<number, ModuleActionResponseWithName[]> = new Map()
    tables.ModuleActionResponse.forEach((item) => {
        let found = ModuleActionId_ModuleActionResponseWithNamezz_map.get(item.moduleActionId)
        if (found === undefined) {
            found = []
            ModuleActionId_ModuleActionResponseWithNamezz_map.set(item.moduleActionId, found)
        }
        const response = Response_map.get(item.responseId)
        if (response) {
            found.push({ ...item, name: response.name })
        }
    })

    // for path
    const PathId_Columnzz_map: Map<number, LB.Column[]> = new Map()
    // for response
    const ResponseId_Columnzz_map: Map<number, LB.Column[]> = new Map()
    // for request
    const RequestId_Columnzz_map: Map<number, LB.Column[]> = new Map()
    tables.ParameterMap.forEach((item) => {
        if (item.pathId) {
            addColumn(PathId_Columnzz_map, item, item.pathId)
            return
        }
        if (item.requestId) {
            addColumn(RequestId_Columnzz_map, item, item.requestId)
            return
        }
        if (item.responseId) {
            addColumn(ResponseId_Columnzz_map, item, item.responseId)
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
        const parameter = Column_map.get(item.columnId)
        if (parameter) {
            found.push(parameter)
        }
    }

    return {
        Entity_map,
        Column_map,
        Module_map,
        ModuleAction_map,
        ModuleActionResponse_map,
        Request_map,
        Response_map,
        Server_map,
        Variable_map,
        Wu_map,

        EntityId_Columnzz_map,
        WuId_Columnzz_map,
        WuId_WuParameter_map,

        PathId_Columnzz_map,
        RequestId_Columnzz_map,
        ResponseId_Columnzz_map,
        ServerId_Variablezz_map,
        TypeFormatChildzz_map,
        WuId_WuParameterzz_map,
        WuId_TypeFormatzz_map,

        ModuleActionId_ModuleActionResponseWithNamezz_map,
    }
}
