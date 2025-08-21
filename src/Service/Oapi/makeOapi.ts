import { OpenApiBuilder, OpenAPIObject, ReferenceObject } from "openapi3-ts"
import makeMediaType from "./makeMediaType"
import makeParameter from "./makeParameter"
import makePath from "./makePath"
import { makeReferenceOf, ComponentKind } from "./makeReference"
import makeSchemaEnum, { makeSchemaEnumName } from "./makeSchemaEnum"
import makeSchemaTypeFormat from "./makeSchemaTypeFormat"
import makeSchemaWu from "./makeSchemaWu"
import makeServer from "./makeServer"
import prepareOapiDto, { getTypeFormatOrThrow } from "./prepareOapiDto"

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
    const od = prepareOapiDto(db.tables)

    const eiem: Map<number, LB.Example> = new Map()
    db.tables.Example.forEach((item) => {
        eiem.set(item.id, item)
        builder.addExample(item.name, {
            description: item.description,
            summary: item.summary,
            value: item.value,
        })
    })


    db.tables.Variable
        .sort((aa, bb) => aa.name.localeCompare(bb.name))
        .forEach((item) => builder.addSchema(makeSchemaEnumName(item.name), makeSchemaEnum(item) as any))

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

    db.tables.Wu.sort(function (aa, bb) {
        const ea = od.Entity_map.get(aa.entityId)
        const eb = od.Entity_map.get(bb.entityId)
        if (ea === undefined || eb === undefined) {
            return 0
        }
        if (ea.name === eb.name) {
            return aa.name.localeCompare(bb.name)
        }
        return ea.name.localeCompare(eb.name)
    }).forEach((wu) => {
        const wpzz = od.WuId_WuParameterzz_map.get(wu.id) ?? []
        if (wpzz.length) {
            return
        }

        builder.addSchema(wu.name, makeSchemaWu(wu, od,) as any,)
    })

    db.tables.ParameterMap.forEach((item) => {
        const column = od.Column_map.get(item.columnId)
        if (column === undefined) {
            return
        }

        const tf = getTypeFormatOrThrow(column.id, od.OwnerColumnId_TypeFormatzz_map)

        makeParameter(
            item,
            column,
            od.Entity_map,
            builder,
            makeSchemaTypeFormat(
                tf,
                od,
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
                    od,
                    riezzm,
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
                    od,
                    riezzm,
                ),
            },
            description: item.description,
            headers: (od.ResponseId_Columnzz_map.get(item.id) ?? []).reduce(function (old, item) {
                old[item.name] = makeReferenceOf(item.name, ComponentKind.headers)
                return old
            }, Object.create(null) as Record<string, ReferenceObject>),
        })
    })


    db.tables.Server.forEach((item) => {
        od.Server_map.set(item.id, item)
        if (item.global) {
            builder.addServer(makeServer(item, od.ServerId_Variablezz_map))
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
            od,
            db.tables.ServerMap,
        )
        if (data === null) {
            return
        }

        const found = od.Entity_map.get(item.entityId)!
        tagSet.add(found.name)

        const module = od.Module_map.get(item.moduleId)!
        tagSet.add(module.name)

        builder.addPath('/' + module.name + item.name, data)
    })

    Array.from(tagSet)
        .sort((aa, bb) => aa.localeCompare(bb))
        .forEach((name) => builder.addTag({ name }))

    return builder
}
