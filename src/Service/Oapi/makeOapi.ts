import { OpenApiBuilder, OpenAPIObject, ReferenceObject } from "openapi3-ts"
import getTypeFormatOrThrow from "../getTypeFormatOrThrow"
import makeMediaType from "./makeMediaType"
import makeParameter from "./makeParameter"
import makePath from "./makePath"
import { makeReferenceOf, ComponentKind } from "./makeReference"
import makeSchemaEnum, { makeSchemaEnumName } from "./makeSchemaEnum"
import makeSchemaTypeFormat from "./makeSchemaTypeFormat"
import makeSchemaWu from "./makeSchemaWu"
import makeServer from "./makeServer"
import prepareOapiDto from "./prepareOapiDto"

export default function makeOapi(data: OpenAPIObject, db: LB.DBData, moduleId: number) {
    const builder = OpenApiBuilder.create({
        ...OpenApiBuilder.create().getSpec(),
        info: data.info,
        externalDocs: data.externalDocs,
    })

    let pathzz = db.tables.Path
    if (moduleId) {
        pathzz = db.tables.Path.filter((item) => item.moduleId === moduleId)
        db.tables.Path = pathzz
    }
    const dd = prepareOapiDto(db.tables)

    const eiem: Map<number, LB.Example> = new Map()
    db.tables.Example.forEach((item) => {
        eiem.set(item.id, item)
        builder.addExample(item.name, {
            description: item.description,
            summary: item.summary,
            value: item.value,
        })
    })


    db.tables.Variable.forEach((item) => builder.addSchema(makeSchemaEnumName(item.name), makeSchemaEnum(item) as any))

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


    const tfzz = db.tables.TypeFormat

    db.tables.Wu.forEach((wu) => {
        const wpzz = dd.WuId_WuParameterzz_map.get(wu.id) ?? []
        if (wpzz.length) {
            return
        }

        builder.addSchema(
            wu.name,
            makeSchemaWu(wu, tfzz, dd,) as any,
        )
    })

    db.tables.ParameterMap.forEach((item) => {
        const column = dd.Column_map.get(item.columnId)
        if (column === undefined) {
            return
        }

        const tf = getTypeFormatOrThrow(column.id, "ownerColumnId", tfzz)

        makeParameter(
            item,
            column,
            dd.Entity_map,
            builder,
            makeSchemaTypeFormat(
                tf,
                tfzz,
                dd.OwnerId_TypeFormatzz_map,
                dd.Variable_map,
                dd.WuId_Columnzz_map,
                dd.OwnerWuChildId_TypeFormatzz_map,
                dd.Wu_map,
                dd.WuId_WuParameterzz_map,
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
                    dd.OwnerId_TypeFormatzz_map,
                    dd.Variable_map,
                    riezzm,
                    dd.WuId_Columnzz_map,
                    dd.OwnerWuChildId_TypeFormatzz_map,
                    dd.Wu_map,
                    dd.WuId_WuParameterzz_map,
                ),
            },
            description: item.description,
            required: item.required,
        })
    })

    db.tables.Response.forEach(function addResponse(item: LB.Response) {
        builder.addResponse(item.name, {
            content: {
                [item.mediaType]: makeMediaType(
                    item,
                    tfzz,
                    dd.OwnerId_TypeFormatzz_map,
                    dd.Variable_map,
                    riezzm,
                    dd.WuId_Columnzz_map,
                    dd.OwnerWuChildId_TypeFormatzz_map,
                    dd.Wu_map,
                    dd.WuId_WuParameterzz_map,
                ),
            },
            description: item.description,
            headers: (dd.ResponseId_Columnzz_map.get(item.id) ?? []).reduce(function (old, item) {
                old[item.name] = makeReferenceOf(item.name, ComponentKind.headers)
                return old
            }, Object.create(null) as Record<string, ReferenceObject>),
        })
    })


    db.tables.Server.forEach((item) => {
        dd.Server_map.set(item.id, item)
        if (item.global) {
            builder.addServer(makeServer(item, dd.ServerId_Variablezz_map))
        }
    })

    const tagSet: Set<string> = new Set()

    pathzz.sort(function (aa, bb) {
        if (aa.moduleId === bb.moduleId) {
            return aa.name.localeCompare(bb.name)
        }
        return aa.moduleId - bb.moduleId
    })
    pathzz.forEach((item) => {
        const data = makePath(
            item,
            dd.Module_map,
            dd.Entity_map,
            dd.ModuleActionId_ModuleActionResponseWithNamezz_map,
            dd.RequestId_Columnzz_map,
            dd.PathId_Columnzz_map,
            dd.Request_map,
            db.tables.ServerMap,
            dd.Server_map,
            dd.ServerId_Variablezz_map,
            dd.ModuleAction_map,
        )
        if (data === null) {
            return
        }

        const found = dd.Entity_map.get(item.entityId)!
        tagSet.add(found.name)

        const module = dd.Module_map.get(item.moduleId)!
        tagSet.add(module.name)

        builder.addPath('/' + module.name + item.name, data)
    })

    Array.from(tagSet)
        .sort((aa, bb) => aa.localeCompare(bb))
        .forEach((name) => builder.addTag({ name }))

    return builder
}
