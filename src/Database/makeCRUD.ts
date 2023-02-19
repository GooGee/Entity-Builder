import { SchemaEnum } from "./createSchema"
import CRUD from "./CRUD"
import RelationCRUD from "./RelationCRUD"
import getDBC, { DBCFactory } from "./getDBC"

export default function makeCRUD<T extends LB.IdItem>(
    dbcf: DBCFactory,
    schema: SchemaEnum,
) {
    return new CRUD<T>(dbcf, schema)
}

export function makeCollectionCRUD() {
    return new CRUD<LB.Collection>(getDBC, SchemaEnum.Collection)
}

export function makeCollectionItemCRUD() {
    return new CRUD<LB.CollectionItem>(getDBC, SchemaEnum.CollectionItem)
}

export function makeColumnCRUD() {
    return new CRUD<LB.Column>(getDBC, SchemaEnum.Column)
}

export function makeColumnConstraintCRUD() {
    return new CRUD<LB.ColumnConstraint>(getDBC, SchemaEnum.ColumnConstraint)
}

export function makeDirectoryCRUD() {
    return new CRUD<LB.Directory>(getDBC, SchemaEnum.Directory)
}

export function makeDoctrineColumnTypeCRUD() {
    return new CRUD<LB.DoctrineColumnType>(getDBC, SchemaEnum.DoctrineColumnType)
}

export function makeEntityCRUD() {
    return new CRUD<LB.Entity>(getDBC, SchemaEnum.Entity)
}

export function makeExampleCRUD() {
    return new CRUD<LB.Example>(getDBC, SchemaEnum.Example)
}

export function makeExampleMapCRUD() {
    return new CRUD<LB.ExampleMap>(getDBC, SchemaEnum.ExampleMap)
}

export function makeFileCRUD() {
    return new CRUD<LB.File>(getDBC, SchemaEnum.File)
}

export function makeIndexCRUD() {
    return new CRUD<LB.Index>(getDBC, SchemaEnum.Index)
}

export function makeIndexColumnCRUD() {
    return new CRUD<LB.IndexColumn>(getDBC, SchemaEnum.IndexColumn)
}

export function makeModuleCRUD() {
    return new CRUD<LB.Module>(getDBC, SchemaEnum.Module)
}

export function makeModuleActionCRUD() {
    return new CRUD<LB.ModuleAction>(getDBC, SchemaEnum.ModuleAction)
}

export function makeModuleActionFileCRUD() {
    return new CRUD<LB.ModuleActionFile>(getDBC, SchemaEnum.ModuleActionFile)
}

export function makeModuleActionResponseCRUD() {
    return new CRUD<LB.ModuleActionResponse>(getDBC, SchemaEnum.ModuleActionResponse)
}

export function makeParameterMapCRUD() {
    return new CRUD<LB.ParameterMap>(getDBC, SchemaEnum.ParameterMap)
}

export function makePathCRUD() {
    return new CRUD<LB.Path>(getDBC, SchemaEnum.Path)
}

export function makePathMethodCRUD() {
    return new CRUD<LB.PathMethod>(getDBC, SchemaEnum.PathMethod)
}

export function makeRelationCRUD() {
    return new RelationCRUD(getDBC)
}

export function makeRequestCRUD() {
    return new CRUD<LB.Request>(getDBC, SchemaEnum.Request)
}

export function makeResponseCRUD() {
    return new CRUD<LB.Response>(getDBC, SchemaEnum.Response)
}

export function makeServerCRUD() {
    return new CRUD<LB.Server>(getDBC, SchemaEnum.Server)
}

export function makeServerMapCRUD() {
    return new CRUD<LB.ServerMap>(getDBC, SchemaEnum.ServerMap)
}

export function makeServerVariableCRUD() {
    return new CRUD<LB.ServerVariable>(getDBC, SchemaEnum.ServerVariable)
}

export function makeTypeFormatCRUD() {
    return new CRUD<LB.TypeFormat>(getDBC, SchemaEnum.TypeFormat)
}

export function makeVariableCRUD() {
    return new CRUD<LB.Variable>(getDBC, SchemaEnum.Variable)
}

export function makeWuCRUD() {
    return new CRUD<LB.Wu>(getDBC, SchemaEnum.Wu)
}

export function makeWuColumnCRUD() {
    return new CRUD<LB.WuColumn>(getDBC, SchemaEnum.WuColumn)
}

export function makeWuColumnConstraintCRUD() {
    return new CRUD<LB.WuColumnConstraint>(getDBC, SchemaEnum.WuColumnConstraint)
}

export function makeWuParameterCRUD() {
    return new CRUD<LB.WuParameter>(getDBC, SchemaEnum.WuParameter)
}
