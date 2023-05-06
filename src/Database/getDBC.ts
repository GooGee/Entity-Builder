import * as lf from "lovefield-ts"
import { DatabaseConnection } from "lovefield-ts"
import createSchema from "./createSchema"

export const Version = 41

const builder = lf.schema.create("LB", Version)
createSchema(builder)
let dbc: lf.DatabaseConnection | undefined = undefined

export default async function getDBC() {
    if (dbc === undefined) {
        dbc = await builder.connect()
    }
    return dbc
}

export function getMaxId(table: any) {
    const indexStore = builder
        .getGlobal()
        .getService<any>(new ServiceId("indexstore") as any)
    const pkIndexSchema = table.getConstraint().getPrimaryKey()
    const index = indexStore.get(pkIndexSchema.getNormalizedName())
    return index.stats().maxKeyEncountered
}

export function exportDB() {
    return getDBC()
        .then((dbc) => dbc.export())
        .then((response) => response as LB.DBData)
}

export function importDB(data: LB.DBData) {
    return getDBC().then((dbc) => dbc.import(data))
}

class ServiceId<T> {
    constructor(private serviceId: string) {}

    toString(): string {
        return this.serviceId
    }

    // Dummy method to please the compiler (need to use <T> somewhere).
    getAsType(): T {
        return {} as unknown as T
    }
}

export interface DBCFactory {
    (): Promise<DatabaseConnection>
}
