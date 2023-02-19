import { SchemaEnum } from "./createSchema"
import {
    create,
    createMany,
    deleteChildzz,
    deleteMany,
    findAll,
    findAllBelongTo,
    findChildzz,
    findOne,
    OmitId,
    update,
    updateMany,
    updateManyColumn,
} from "./dbhelper"
import { DBCFactory } from "./getDBC"

export default class CRUD<T extends LB.IdItem> {
    constructor(readonly dbcf: DBCFactory, readonly schema: SchemaEnum) {}

    create(data: OmitId<T>) {
        return this.dbcf().then((dbc) => create<T>(dbc, this.schema, data as T))
    }

    createMany(data: OmitId<T>[]) {
        return this.dbcf().then((dbc) => createMany<T>(dbc, this.schema, data as T[]))
    }

    delete(id: number) {
        return this.deleteMany([id])
    }

    deleteChildzz(parentId: number, column: string) {
        return this.dbcf().then((dbc) =>
            deleteChildzz(dbc, this.schema, parentId, column),
        )
    }

    deleteMany(idzz: number[]) {
        return this.dbcf().then((dbc) => deleteMany(dbc, this.schema, idzz))
    }

    findAll() {
        return this.dbcf().then((dbc) => findAll<T>(dbc, this.schema))
    }

    findAllBelongTo(idzz: number[], column: string) {
        return this.dbcf().then((dbc) =>
            findAllBelongTo<T>(dbc, this.schema, idzz, column),
        )
    }

    findChildzz(parentId: number, column: string) {
        return this.dbcf().then((dbc) =>
            findChildzz<T>(dbc, this.schema, parentId, column),
        )
    }

    observeAll(handler: (itemzz: T[]) => void) {
        return this.dbcf().then((dbc) => {
            const tt = dbc.getSchema().table(this.schema)
            const query = dbc.select().from(tt)
            dbc.observe(query, function () {
                query.exec().then((response) => {
                    handler(response as T[])
                })
            })
        })
    }

    read(id: number) {
        return this.dbcf().then((dbc) => findOne<T>(dbc, this.schema, id))
    }

    update(data: T) {
        return this.dbcf().then((dbc) => update<T>(dbc, this.schema, data))
    }

    updateMany(data: T[]) {
        return this.dbcf().then((dbc) => updateMany<T>(dbc, this.schema, data))
    }

    updateManyColumn(column: string, value: string | number, where: string | number) {
        return this.dbcf().then((dbc) =>
            updateManyColumn<T>(dbc, this.schema, column, value, where),
        )
    }
}
