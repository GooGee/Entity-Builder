import { makeChildzzMap, makeIdItemMap, makeNameItemMap } from "@/Factory/makeMap"
import { ModuleActionResponseWithName } from "./makePath"
import makeModuleActionResponse from "@/Database/Factory/makeModuleActionResponse"
import makeResponse from "@/Database/Factory/makeResponse"
import makeTypeFormat from "@/Database/Factory/makeTypeFormat"
import makeWu from "@/Database/Factory/makeWu"
import { HttpMethod, OapiType } from "@/Model/Oapi"
import { makeParameterName, makeResponseName } from "../makeName"
import { PageEnum } from "@/menuzz"
import makeColumn from "@/Database/Factory/makeColumn"

export type OapiDto = {
    Column_map: Map<number, LB.Column>
    Entity_map: Map<number, LB.Entity>
    Module_map: Map<number, LB.Module>
    ModuleAction_map: Map<number, LB.ModuleAction>
    ModuleActionResponse_map: Map<number, LB.ModuleActionResponse>
    Request_map: Map<number, LB.Request>
    Response_map: Map<number, LB.Response>
    Server_map: Map<number, LB.Server>
    Variable_map: Map<number, LB.Variable>
    Wu_map: Map<number, LB.Wu>
    EntityId_Columnzz_map: Map<number, LB.Column[]>
    WuColumnId_ColumnConstraintzz_map: Map<number, LB.ColumnConstraint[]>
    WuId_Columnzz_map: Map<number, LB.Column[]>
    WuId_WuColumnzz_map: Map<number, LB.WuColumn[]>
    WuId_WuParameter_map: Map<number, LB.WuParameter>
    PathId_Columnzz_map: Map<number, LB.Column[]>
    RequestId_Columnzz_map: Map<number, LB.Column[]>
    ResponseId_Columnzz_map: Map<number, LB.Column[]>
    ServerId_Variablezz_map: Map<number, LB.Variable[]>
    TypeFormatChildzz_map: Map<number, LB.TypeFormat[]>
    WuId_WuParameterzz_map: Map<number, LB.WuParameter[]>
    WuId_TypeFormatzz_map: Map<number, LB.TypeFormat[]>
    ModuleActionId_ModuleActionResponseWithNamezz_map: Map<number, ModuleActionResponseWithName[]>
}


let bigId = 111_222_333
let wcid = bigId


/**
 * for `get` request with a requestBody, since requestBody is not valid in OpenApi 3.0,
 * so create parameters for each column in the requestBody
 */
function makeAllParameter(
    tables: LB.DBTable,
    ma: LB.ModuleAction,
    Column_map: Map<number, LB.Column>,
    EntityId_Columnzz_map: Map<number, LB.Column[]>,
    Module_map: Map<number, LB.Module>,
    ParameterEntity: LB.Entity,
    Request_map: Map<number, LB.Request>,
    WuColumnId_ColumnConstraintzz_map: Map<number, LB.ColumnConstraint[]>,
    WuId_WuColumnzz_map: Map<number, LB.WuColumn[]>,
) {
    if (ma.requestId === 1) {
        return
    }

    const module = Module_map.get(ma.moduleId)
    if (module == null) {
        return
    }

    const request = Request_map.get(ma.requestId)
    if (request == null) {
        return
    }
    if (tables.ParameterMap.some((item) => item.requestId === request.id)) {
        return
    }

    const tf = tables.TypeFormat.find((item) => item.ownerRequestId === request.id)
    if (tf == null) {
        return
    }
    if (tf.wuId === 1) {
        return
    }

    const wuColumnzz = WuId_WuColumnzz_map.get(tf.wuId)
    if (wuColumnzz == null) {
        return
    }
    if (wuColumnzz.length === 0) {
        return
    }

    let ParameterColumnzz = EntityId_Columnzz_map.get(ParameterEntity.id)
    if (ParameterColumnzz == null) {
        ParameterColumnzz = []
        EntityId_Columnzz_map.set(ParameterEntity.id, ParameterColumnzz)
    }
    const ParameterColumnNameSet = new Set(ParameterColumnzz.map((item) => item.name))

    wuColumnzz.forEach((item) => {
        const column = Column_map.get(item.columnId)
        if (column == null) {
            return
        }

        const name = makeParameterName(module, ma, ParameterEntity, column.name)
        if (ParameterColumnNameSet.has(name)) {
            return
        }

        let required = false
        const cczz = WuColumnId_ColumnConstraintzz_map.get(item.id)
        if (cczz) {
            required = cczz.some((cc) => cc.name === 'present' || cc.name === 'required')
        }

        const nc = makeColumn(ParameterEntity.id, name, column.type,) as LB.Column
        nc.id = wcid
        wcid += 1
        nc.required = required
        nc.style = 'form'
        tables.Column.push(nc)
        Column_map.set(nc.id, nc)
        ParameterColumnzz.push(nc)

        const tf = makeTypeFormat(
            column.type as any,
            1,
            null,
            null,
            null,
            null,
            nc.id,
        ) as LB.TypeFormat
        tf.id = wcid
        wcid += 1
        tables.TypeFormat.push(tf)

        tables.ParameterMap.push({
            id: wcid,
            alias: column.name,
            columnId: nc.id,
            pathId: null,
            requestId: request.id,
            responseId: null,
        })
        wcid += 1
    })
}

function makeAllWuColumn(
    tables: LB.DBTable,
    entity: LB.Entity,
    EntityId_Columnzz_map: Map<number, LB.Column[]>,
    wu: LB.Wu,
) {
    const czz = EntityId_Columnzz_map.get(entity.id) ?? []
    czz.forEach((item) => {
        if (item.inTable && item.hidden) {
            return
        }
        tables.WuColumn.push({
            wuId: wu.id,
            columnId: item.id,
            alias: "",
            id: wcid,
        })
        wcid += 1
    })
}

/**
 * for paths without any response, create a 200 response with content of the entity
 */
function prepare(
    tables: LB.DBTable,
    Column_map: Map<number, LB.Column>,
    Entity_map: Map<number, LB.Entity>,
    EntityId_Columnzz_map: Map<number, LB.Column[]>,
    Module_map: Map<number, LB.Module>,
    ModuleAction_map: Map<number, LB.ModuleAction>,
    ModuleActionId_ModuleActionResponsezz_map: Map<number, LB.ModuleActionResponse[]>,
    ModuleActionResponse_map: Map<number, LB.ModuleActionResponse>,
    Request_map: Map<number, LB.Request>,
    Response_map: Map<number, LB.Response>,
    Wu_map: Map<number, LB.Wu>,
    WuColumnId_ColumnConstraintzz_map: Map<number, LB.ColumnConstraint[]>,
    WuId_WuColumnzz_map: Map<number, LB.WuColumn[]>,
    WuId_WuParameter_map: Map<number, LB.WuParameter>,
) {

    const ParameterEntity = tables.Entity.find((item) => item.name === PageEnum.ParameterInQuery)!
    const ResponseNameSet = new Set(tables.Response.map((item) => item.name))
    const WuName_Wu_map = makeNameItemMap(tables.Wu)

    tables.Path.forEach(function (path) {
        const module = Module_map.get(path.moduleId)
        if (module == null) {
            return
        }
        const ma = ModuleAction_map.get(path.moduleActionId)
        if (ma == null) {
            return
        }
        let marzz = ModuleActionId_ModuleActionResponsezz_map.get(path.moduleActionId)
        if (marzz && marzz.length > 0) {
            return
        }
        const entity = Entity_map.get(ma.entityId)
        if (entity == null) {
            return
        }
        if (entity.id === 1) {
            return
        }

        const name = makeResponseName(module, ma, entity)
        if (ResponseNameSet.has(name)) {
            return
        }

        const wrapper = Wu_map.get(ma.responseWuId)
        if (wrapper == null) {
            return
        }

        const method = path.method as keyof typeof HttpMethod
        if (method === HttpMethod.get) {
            makeAllParameter(
                tables,
                ma,
                Column_map,
                EntityId_Columnzz_map,
                Module_map,
                ParameterEntity,
                Request_map,
                WuColumnId_ColumnConstraintzz_map,
                WuId_WuColumnzz_map,
            )
        }

        let wu = WuName_Wu_map.get(entity.name)
        if (wu == null) {
            wu = makeWu(entity.name, entity.id) as LB.Wu
            wu.id = bigId
            tables.Wu.push(wu)
            Wu_map.set(wu.id, wu)
            WuName_Wu_map.set(wu.name, wu)

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
        ModuleActionResponse_map.set(mar.id, mar)
        if (marzz == null) {
            marzz = []
            ModuleActionId_ModuleActionResponsezz_map.set(ma.id, marzz)
        }
        marzz.push(mar)

        bigId += 1
    })

}

export default function prepareOapiDto(tables: LB.DBTable) {

    const Column_map = makeIdItemMap(tables.Column)
    const ColumnConstraint_map = makeIdItemMap(tables.ColumnConstraint)
    const Entity_map = makeIdItemMap(tables.Entity)
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
        if (found == null) {
            found = []
            EntityId_Columnzz_map.set(item.entityId, found)
        }
        found.push(item)
    })

    const ModuleActionId_ModuleActionResponsezz_map: Map<number, LB.ModuleActionResponse[]> = makeChildzzMap(
        tables.ModuleActionResponse,
        "moduleActionId",
    )

    const WuColumnId_ColumnConstraintzz_map: Map<number, LB.ColumnConstraint[]> = new Map()
    tables.WuColumnConstraint.forEach((item) => {
        let found = WuColumnId_ColumnConstraintzz_map.get(item.wuColumnId)
        if (found == null) {
            found = []
            WuColumnId_ColumnConstraintzz_map.set(item.wuColumnId, found)
        }
        const cc = ColumnConstraint_map.get(item.columnConstraintId)
        if (cc) {
            found.push(cc)
        }
    })

    const WuId_WuColumnzz_map: Map<number, LB.WuColumn[]> = new Map()
    tables.WuColumn.forEach((item) => {
        let found = WuId_WuColumnzz_map.get(item.wuId)
        if (found == null) {
            found = []
            WuId_WuColumnzz_map.set(item.wuId, found)
        }
        found.push(item)
    })

    const WuId_WuParameter_map = new Map<number, LB.WuParameter>()
    tables.WuParameter.forEach((item) => {
        let found = WuId_WuParameter_map.get(item.wuId)
        if (found == null) {
            found = item
            WuId_WuParameter_map.set(item.wuId, found)
        }
    })

    prepare(
        tables,
        Column_map,
        Entity_map,
        EntityId_Columnzz_map,
        Module_map,
        ModuleAction_map,
        ModuleActionId_ModuleActionResponsezz_map,
        ModuleActionResponse_map,
        Request_map,
        Response_map,
        Wu_map,
        WuColumnId_ColumnConstraintzz_map,
        WuId_WuColumnzz_map,
        WuId_WuParameter_map,
    )

    const WuId_Columnzz_map: Map<number, LB.Column[]> = new Map()
    tables.WuColumn.forEach((item) => {
        let found = WuId_Columnzz_map.get(item.wuId)
        if (found == null) {
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
        if (found == null) {
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
        if (found == null) {
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
        if (found == null) {
            found = []
            map.set(targetId, found)
        }
        const parameter = Column_map.get(item.columnId)
        if (parameter) {
            found.push(parameter)
        }
    }

    return {
        Column_map,
        ColumnConstraint_map,
        Entity_map,
        Module_map,
        ModuleAction_map,
        ModuleActionResponse_map,
        Request_map,
        Response_map,
        Server_map,
        Variable_map,
        Wu_map,

        EntityId_Columnzz_map,
        WuColumnId_ColumnConstraintzz_map,
        WuId_Columnzz_map,
        WuId_WuColumnzz_map,
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
