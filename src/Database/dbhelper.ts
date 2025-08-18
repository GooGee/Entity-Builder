import * as lf from "lovefield-ts"
import { DatabaseConnection } from "lovefield-ts"
import { SchemaEnum } from "./createSchema"
import { getMaxId } from "./getDBC"

export type idOrName = "id" | "name"

export type OmitId<T extends LB.IdItem> = Omit<T, "id">

export function count(dbc: DatabaseConnection, schema: SchemaEnum) {
    const tt = dbc.getSchema().table(schema)
    const pp = dbc.select(lf.fn.count().as("amount")).from(tt).exec() as Promise<
        LB.DBCountResult[]
    >
    return pp.then((zz) => zz[0])
}

export function create<T extends LB.IdItem>(
    dbc: DatabaseConnection,
    schema: SchemaEnum,
    data: T,
) {
    return createMany(dbc, schema, [data]).then((zz) => {
        if (zz.length === 0) {
            throw new Error(`fail to create item in ${schema}`)
        }
        return zz[0]
    })
}

export function createMany<T extends LB.IdItem>(
    dbc: DatabaseConnection,
    schema: SchemaEnum,
    data: T[],
) {
    if (data.length === 0) {
        return Promise.resolve([])
    }

    const tt = dbc.getSchema().table(schema)
    if (import.meta.env.PROD) {
        const maxId = getMaxId(tt)
        // console.log(maxId)
        const min = 111000
        if (maxId < min) {
            data.forEach((item, index) => (item.id = min + index))
        }
    }
    const rowzz = data.map((item) => tt.createRow(item))
    return dbc.insert().into(tt).values(rowzz).exec() as Promise<T[]>
}

export function deleteChildzz(
    dbc: DatabaseConnection,
    schema: SchemaEnum,
    parentId: number,
    column: string,
) {
    const tt = dbc.getSchema().table(schema)
    return dbc.delete().from(tt).where(tt.col(column).eq(parentId)).exec() as Promise<
        number[]
    >
}

export function deleteMany(
    dbc: DatabaseConnection,
    schema: SchemaEnum,
    idzz: number[] | string[],
    column: idOrName = "id",
) {
    const tt = dbc.getSchema().table(schema)
    return dbc.delete().from(tt).where(tt.col(column).in(idzz)).exec() as Promise<
        number[]
    >
}

export function findAll<T>(dbc: DatabaseConnection, schema: SchemaEnum) {
    const tt = dbc.getSchema().table(schema)
    return dbc.select().from(tt).exec() as Promise<T[]>
}

export function findAllBelongTo<T>(
    dbc: DatabaseConnection,
    schema: SchemaEnum,
    idzz: number[],
    column: string,
) {
    const tt = dbc.getSchema().table(schema)
    return dbc.select().from(tt).where(tt.col(column).in(idzz)).exec() as Promise<T[]>
}

export function findChildzz<T>(
    dbc: DatabaseConnection,
    schema: SchemaEnum,
    parentId: number,
    column: string,
) {
    const tt = dbc.getSchema().table(schema)
    return dbc.select().from(tt).where(tt.col(column).eq(parentId)).exec() as Promise<
        T[]
    >
}

export function findOne<T>(
    dbc: DatabaseConnection,
    schema: SchemaEnum,
    id: number | string,
    column: idOrName = "id",
) {
    const tt = dbc.getSchema().table(schema)
    const pp = dbc.select().from(tt).where(tt.col(column).eq(id)).exec() as Promise<T[]>
    return pp.then((zz) => {
        if (zz.length === 0) {
            throw new Error(`${schema} ${column} ${id} not found`)
        }
        return zz[0]
    })
}

export function update<T extends LB.IdItem>(
    dbc: DatabaseConnection,
    schema: SchemaEnum,
    data: T,
) {
    return updateMany(dbc, schema, [data]).then((zz) => {
        if (zz.length === 0) {
            throw new Error(`fail to update ${schema}`)
        }
        return zz[0]
    })
}

export function updateMany<T extends LB.IdItem>(
    dbc: DatabaseConnection,
    schema: SchemaEnum,
    data: T[],
) {
    const tt = dbc.getSchema().table(schema)
    const rowzz: any[] = []
    data.forEach((item) => rowzz.push(tt.createRow(item)))
    return dbc.insertOrReplace().into(tt).values(rowzz).exec() as Promise<T[]>
}

export function updateManyColumn<T extends LB.IdItem>(
    dbc: DatabaseConnection,
    schema: SchemaEnum,
    column: string,
    value: string | number,
    where: string | number,
) {
    const tt = dbc.getSchema().table(schema)
    return dbc
        .update(tt)
        .set(tt.col(column), value)
        .where(tt.col(column).eq(where))
        .exec() as Promise<T[]>
}
