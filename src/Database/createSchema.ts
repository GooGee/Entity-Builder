import lodash from "lodash"
import * as lf from "lovefield-ts"

export enum SchemaEnum {
    Collection = "Collection",
    CollectionItem = "CollectionItem",
    Column = "Column",
    ColumnConstraint = "ColumnConstraint",
    Directory = "Directory",
    Entity = "Entity",
    Example = "Example",
    ExampleMap = "ExampleMap",
    File = "File",
    Index = "Index",
    IndexColumn = "IndexColumn",
    Module = "Module",
    ModuleAction = "ModuleAction",
    ModuleActionFile = "ModuleActionFile",
    ModuleActionResponse = "ModuleActionResponse",
    ParameterMap = "ParameterMap",
    Path = "Path",
    PathMethod = "PathMethod",
    Relation = "Relation",
    Request = "Request",
    Response = "Response",
    Server = "Server",
    ServerMap = "ServerMap",
    ServerVariable = "ServerVariable",
    Variable = "Variable",
    Wu = "Wu",
    WuChild = "WuChild",
    WuColumn = "WuColumn",
    WuColumnConstraint = "WuColumnConstraint",
    WuParameter = "WuParameter",
}

export default function createSchema(builder: lf.Builder) {
    let item = SchemaEnum.Collection
    let tb = createForSideBarUniqueItem(builder, item)
        .addColumn("valueDescription", lf.Type.STRING)
        .addColumn("tagDescription", lf.Type.STRING)

    item = SchemaEnum.CollectionItem
    tb = builder
        .createTable(item)
        .addColumn("id", lf.Type.INTEGER)
        .addColumn("name", lf.Type.STRING)
        .addColumn("value", lf.Type.STRING)
        .addColumn("tag", lf.Type.STRING)
        .addPrimaryKey(["id"], true)
    makeForeignKey(tb, item, SchemaEnum.Collection)
    makeUniqueKey(tb, item, [makeForeignKeyId(SchemaEnum.Collection), "name"])

    item = SchemaEnum.Directory
    tb = builder
        .createTable(item)
        .addColumn("id", lf.Type.INTEGER)
        .addColumn("opened", lf.Type.BOOLEAN)
        .addColumn("name", lf.Type.STRING)
        .addColumn("description", lf.Type.STRING)
        .addColumn("parentId", lf.Type.INTEGER)
        .addPrimaryKey(["id"], true)
        .addNullable(["parentId"])
    makeUniqueKey(tb, item, ["parentId", "name"])

    item = SchemaEnum.File
    tb = builder
        .createTable(item)
        .addColumn("id", lf.Type.INTEGER)
        .addColumn("name", lf.Type.STRING)
        .addColumn("color", lf.Type.STRING)
        .addColumn("layer", lf.Type.STRING)
        .addColumn("description", lf.Type.STRING)
        .addColumn("nameSpacePattern", lf.Type.STRING)
        .addColumn("fileNamePattern", lf.Type.STRING)
        .addPrimaryKey(["id"], true)
    makeForeignKey(tb, item, SchemaEnum.Directory)
    makeUniqueKey(tb, item, ["name"])

    item = SchemaEnum.Entity
    tb = createForSideBarUniqueItem(builder, item)
        .addColumn("isTable", lf.Type.BOOLEAN)
        .addColumn("opened", lf.Type.BOOLEAN)
        .addColumn("openedColumn", lf.Type.BOOLEAN)
        .addColumn("x", lf.Type.INTEGER)
        .addColumn("y", lf.Type.INTEGER)

    item = SchemaEnum.Column
    tb = builder
        .createTable(item)
        .addColumn("id", lf.Type.INTEGER)
        .addColumn("name", lf.Type.STRING)
        .addColumn("type", lf.Type.STRING)
        .addColumn("length", lf.Type.INTEGER)
        .addColumn("scale", lf.Type.INTEGER)
        .addColumn("unsigned", lf.Type.BOOLEAN)
        .addColumn("nullable", lf.Type.BOOLEAN)
        .addColumn("comment", lf.Type.STRING)
        .addColumn("default", lf.Type.STRING)
        .addColumn("fillable", lf.Type.BOOLEAN)
        .addColumn("ro", lf.Type.BOOLEAN)
        .addColumn("wo", lf.Type.BOOLEAN)
        .addColumn("cast", lf.Type.STRING)
        .addColumn("fakeRaw", lf.Type.BOOLEAN)
        .addColumn("fakeUnique", lf.Type.BOOLEAN)
        .addColumn("fakeMethod", lf.Type.STRING)
        .addColumn("fakeText", lf.Type.STRING)
        .addColumn("inTable", lf.Type.BOOLEAN)
        .addColumn("tf", lf.Type.OBJECT)
        .addPrimaryKey(["id"], true)
        .addColumn("allowReserved", lf.Type.BOOLEAN)
        .addColumn("color", lf.Type.STRING)
        .addColumn("deprecated", lf.Type.BOOLEAN)
        .addColumn("description", lf.Type.BOOLEAN)
        .addColumn("example", lf.Type.STRING)
        .addColumn("explode", lf.Type.BOOLEAN)
        .addColumn("required", lf.Type.BOOLEAN)
        .addColumn("style", lf.Type.STRING)
    makeForeignKey(tb, item, SchemaEnum.Entity)
    makeUniqueKey(tb, item, [makeForeignKeyId(SchemaEnum.Entity), "name"])

    item = SchemaEnum.ColumnConstraint
    tb = builder
        .createTable(item)
        .addColumn("id", lf.Type.INTEGER)
        .addColumn("name", lf.Type.STRING)
        .addColumn("parameter", lf.Type.STRING)
        .addPrimaryKey(["id"], true)
    makeForeignKey(tb, item, SchemaEnum.Column)

    item = SchemaEnum.Relation
    tb = builder
        .createTable(item)
        .addColumn("id", lf.Type.INTEGER)
        .addColumn("type", lf.Type.STRING)
        .addColumn("name0", lf.Type.STRING)
        .addColumn("name1", lf.Type.STRING)
        .addPrimaryKey(["id"], true)
    makeForeignKey(tb, item, SchemaEnum.Entity, "entity0Id")
    makeForeignKey(tb, item, SchemaEnum.Entity, "entity1Id")
    makeForeignKey(tb, item, SchemaEnum.Column, "column1Id")
    makeUniqueKey(tb, item, ["entity1Id", "column1Id"])

    item = SchemaEnum.Index
    tb = builder
        .createTable(item)
        .addColumn("id", lf.Type.INTEGER)
        .addColumn("type", lf.Type.STRING)
        .addPrimaryKey(["id"], true)
    makeForeignKey(tb, item, SchemaEnum.Entity)

    item = SchemaEnum.IndexColumn
    tb = builder
        .createTable(item)
        .addColumn("id", lf.Type.INTEGER)
        .addColumn("sort", lf.Type.INTEGER)
        .addPrimaryKey(["id"], true)
    makeForeignKey(tb, item, SchemaEnum.Column)
    makeForeignKey(tb, item, SchemaEnum.Index)
    makeUniqueKey(tb, item, [
        makeForeignKeyId(SchemaEnum.Column),
        makeForeignKeyId(SchemaEnum.Index),
    ])

    item = SchemaEnum.Wu
    tb = createForSideBarUniqueItem(builder, item)
        .addColumn("type", lf.Type.STRING)
        .addColumn("example", lf.Type.STRING)
        .addColumn("isRequest", lf.Type.BOOLEAN)
        .addColumn("isMap", lf.Type.BOOLEAN)
        .addColumn("tf", lf.Type.OBJECT)
    makeForeignKey(tb, item, SchemaEnum.Entity)

    item = SchemaEnum.WuChild
    tb = builder
        .createTable(item)
        .addColumn("id", lf.Type.INTEGER)
        .addColumn("tf", lf.Type.OBJECT)
        .addPrimaryKey(["id"], true)
    makeForeignKey(tb, item, SchemaEnum.Wu)

    item = SchemaEnum.WuColumn
    tb = builder
        .createTable(item)
        .addColumn("id", lf.Type.INTEGER)
        .addColumn("alias", lf.Type.STRING)
        .addPrimaryKey(["id"], true)
    makeForeignKey(tb, item, SchemaEnum.Wu)
    makeForeignKey(tb, item, SchemaEnum.Column)

    item = SchemaEnum.WuColumnConstraint
    tb = builder
        .createTable(item)
        .addColumn("id", lf.Type.INTEGER)
        .addPrimaryKey(["id"], true)
    makeForeignKey(tb, item, SchemaEnum.ColumnConstraint)
    makeForeignKey(tb, item, SchemaEnum.WuColumn)

    // TypeParameter
    item = SchemaEnum.WuParameter
    tb = builder
        .createTable(item)
        .addColumn("id", lf.Type.INTEGER)
        .addColumn("name", lf.Type.STRING)
        .addColumn("description", lf.Type.STRING)
        .addColumn("isWu", lf.Type.BOOLEAN)
        .addPrimaryKey(["id"], true)
    makeForeignKey(tb, item, SchemaEnum.Wu)
    makeUniqueKey(tb, item, [makeForeignKeyId(SchemaEnum.Wu), "name"])

    item = SchemaEnum.Module
    tb = createForSideBarUniqueItem(builder, item).addColumn("prefix", lf.Type.STRING)
    makeForeignKey(tb, item, SchemaEnum.File)
    makeForeignKey(tb, item, SchemaEnum.Directory)
    makeForeignKey(tb, item, SchemaEnum.Directory, "testDirectoryId")
    makeUniqueKey(tb, item, ["prefix"])

    item = SchemaEnum.Path
    tb = createForSideBarItem(builder, item).addColumn("summary", lf.Type.STRING)
    makeForeignKey(tb, item, SchemaEnum.Module)
    makeForeignKey(tb, item, SchemaEnum.Entity)
    makeUniqueKey(tb, item, [makeForeignKeyId(SchemaEnum.Module), "name"])

    item = SchemaEnum.ModuleAction
    tb = builder
        .createTable(item)
        .addColumn("id", lf.Type.INTEGER)
        .addColumn("deprecated", lf.Type.BOOLEAN)
        .addColumn("description", lf.Type.STRING)
        .addColumn("summary", lf.Type.STRING)
        .addColumn("operationId", lf.Type.STRING)
        .addPrimaryKey(["id"], true)
    makeForeignKey(tb, item, SchemaEnum.Directory)
    makeForeignKey(tb, item, SchemaEnum.Directory, "testDirectoryId")
    makeForeignKey(tb, item, SchemaEnum.Request)
    makeForeignKey(tb, item, SchemaEnum.Entity)
    makeForeignKey(tb, item, SchemaEnum.CollectionItem)
    makeForeignKey(tb, item, SchemaEnum.Module)
    makeUniqueKey(tb, item, ["operationId"])
    makeUniqueKey(tb, item, [
        makeForeignKeyId(SchemaEnum.Entity),
        makeForeignKeyId(SchemaEnum.Module),
        makeForeignKeyId(SchemaEnum.CollectionItem),
    ])

    item = SchemaEnum.ModuleActionFile
    tb = builder
        .createTable(item)
        .addColumn("id", lf.Type.INTEGER)
        .addPrimaryKey(["id"], true)
    makeForeignKey(tb, item, SchemaEnum.ModuleAction)
    makeForeignKey(tb, item, SchemaEnum.File)
    makeForeignKey(tb, item, SchemaEnum.Directory)
    makeUniqueKey(tb, item, [
        makeForeignKeyId(SchemaEnum.ModuleAction),
        makeForeignKeyId(SchemaEnum.File),
    ])

    item = SchemaEnum.ParameterMap
    tb = builder
        .createTable(item)
        .addColumn("id", lf.Type.INTEGER)
        .addColumn("alias", lf.Type.STRING)
        .addPrimaryKey(["id"], true)
    makeForeignKey(tb, item, SchemaEnum.Column)
    makeForeignKey(tb, item, SchemaEnum.Path)
    makeForeignKey(tb, item, SchemaEnum.Request)
    makeForeignKey(tb, item, SchemaEnum.Response)
    makeUniqueKey(tb, item, [
        makeForeignKeyId(SchemaEnum.Column),
        makeForeignKeyId(SchemaEnum.Path),
        makeForeignKeyId(SchemaEnum.Request),
        makeForeignKeyId(SchemaEnum.Response),
    ]).addNullable([
        makeForeignKeyId(SchemaEnum.Path),
        makeForeignKeyId(SchemaEnum.Request),
        makeForeignKeyId(SchemaEnum.Response),
    ])

    item = SchemaEnum.Request
    tb = createForSideBarUniqueItem(builder, item)
        .addColumn("example", lf.Type.STRING)
        .addColumn("mediaType", lf.Type.STRING)
        .addColumn("required", lf.Type.BOOLEAN)
        .addColumn("tf", lf.Type.OBJECT)

    item = SchemaEnum.Response
    tb = createForSideBarUniqueItem(builder, item)
        .addColumn("example", lf.Type.STRING)
        .addColumn("mediaType", lf.Type.STRING)
        .addColumn("tf", lf.Type.OBJECT)

    item = SchemaEnum.ModuleActionResponse
    tb = builder
        .createTable(item)
        .addColumn("id", lf.Type.INTEGER)
        .addColumn("description", lf.Type.STRING)
        .addColumn("status", lf.Type.STRING)
        .addPrimaryKey(["id"], true)
    makeForeignKey(tb, item, SchemaEnum.ModuleAction)
    makeForeignKey(tb, item, SchemaEnum.Response)
    makeUniqueKey(tb, item, [makeForeignKeyId(SchemaEnum.ModuleAction), "status"])

    item = SchemaEnum.Example
    tb = createForSideBarUniqueItem(builder, item)
        .addColumn("summary", lf.Type.STRING)
        .addColumn("value", lf.Type.STRING)

    item = SchemaEnum.ExampleMap
    tb = builder
        .createTable(item)
        .addColumn("id", lf.Type.INTEGER)
        .addPrimaryKey(["id"], true)
    makeForeignKey(tb, item, SchemaEnum.Example)
    makeForeignKey(tb, item, SchemaEnum.Request)
    makeForeignKey(tb, item, SchemaEnum.Response)
    makeUniqueKey(tb, item, [
        makeForeignKeyId(SchemaEnum.Example),
        makeForeignKeyId(SchemaEnum.Request),
        makeForeignKeyId(SchemaEnum.Response),
    ]).addNullable([
        makeForeignKeyId(SchemaEnum.Request),
        makeForeignKeyId(SchemaEnum.Response),
    ])

    item = SchemaEnum.Server
    tb = createForSideBarUniqueItem(builder, item).addColumn("global", lf.Type.BOOLEAN)

    item = SchemaEnum.ServerMap
    tb = builder
        .createTable(item)
        .addColumn("id", lf.Type.INTEGER)
        .addPrimaryKey(["id"], true)
    makeForeignKey(tb, item, SchemaEnum.Path)
    makeForeignKey(tb, item, SchemaEnum.Request)
    makeForeignKey(tb, item, SchemaEnum.Server)
    makeUniqueKey(tb, item, [
        makeForeignKeyId(SchemaEnum.Path),
        makeForeignKeyId(SchemaEnum.Request),
        makeForeignKeyId(SchemaEnum.Server),
    ]).addNullable([
        makeForeignKeyId(SchemaEnum.Path),
        makeForeignKeyId(SchemaEnum.Request),
    ])

    item = SchemaEnum.Variable
    tb = createForSideBarUniqueItem(builder, item)
        .addColumn("default", lf.Type.STRING)
        .addColumn("enum", lf.Type.OBJECT)
        .addColumn("type", lf.Type.STRING)

    item = SchemaEnum.ServerVariable
    tb = builder
        .createTable(item)
        .addColumn("id", lf.Type.INTEGER)
        .addPrimaryKey(["id"], true)
    makeForeignKey(tb, item, SchemaEnum.Server)
    makeForeignKey(tb, item, SchemaEnum.Variable)
    makeUniqueKey(tb, item, [
        makeForeignKeyId(SchemaEnum.Server),
        makeForeignKeyId(SchemaEnum.Variable),
    ])

    item = SchemaEnum.PathMethod
    tb = builder
        .createTable(item)
        .addColumn("method", lf.Type.STRING)
        .addColumn("middlewarezz", lf.Type.OBJECT)
        .addColumn("id", lf.Type.INTEGER)
        .addPrimaryKey(["id"], true)
    makeForeignKey(tb, item, SchemaEnum.ModuleAction)
    makeForeignKey(tb, item, SchemaEnum.Path)
    makeUniqueKey(tb, item, ["method", makeForeignKeyId(SchemaEnum.Path)])
}

function createForSideBarItem(builder: lf.Builder, item: SchemaEnum) {
    const tb = builder
        .createTable(item)
        .addColumn("id", lf.Type.INTEGER)
        .addColumn("name", lf.Type.STRING)
        .addColumn("color", lf.Type.STRING)
        .addColumn("description", lf.Type.STRING)
        .addColumn("reserved", lf.Type.BOOLEAN)
        .addPrimaryKey(["id"], true)
    return tb
}

function createForSideBarUniqueItem(builder: lf.Builder, item: SchemaEnum) {
    const tb = createForSideBarItem(builder, item)
    makeUniqueKey(tb, item, ["name"])
    return tb
}

function makeForeignKey(
    tb: lf.TableBuilder,
    schema: SchemaEnum,
    target: SchemaEnum,
    column?: string,
) {
    const name = column ?? makeForeignKeyId(target)
    return tb.addColumn(name, lf.Type.INTEGER).addForeignKey(`fk_${schema}_${name}`, {
        action: lf.ConstraintAction.CASCADE,
        local: name,
        ref: target + ".id",
    })
}

export function makeForeignKeyId(target: string) {
    return lodash.lowerFirst(target) + "Id"
}

function makeUniqueKey(tb: lf.TableBuilder, schema: SchemaEnum, column: string[]) {
    return tb.addUnique(`uk_${schema}_${column.join("_")}`, column)
}
