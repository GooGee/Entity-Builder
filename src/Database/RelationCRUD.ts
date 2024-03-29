import * as lf from "lovefield-ts"
import { SchemaEnum } from "./createSchema"
import { OmitId } from "./dbhelper"
import { DBCFactory } from "./getDBC"
import makeCRUD from "./makeCRUD"

const entity = SchemaEnum.Relation
type T = LB.Relation

export default class RelationCRUD {
    readonly crud

    constructor(dbcf: DBCFactory) {
        this.crud = makeCRUD<T>(dbcf, entity)
    }

    create(data: OmitId<T>) {
        return this.crud.create(data)
    }

    delete(id: number) {
        return this.crud.delete(id)
    }

    findAll() {
        return this.crud.findAll()
    }

    findAllBelongTo(tizz: number[]) {
        return this.crud.dbcf().then((connection) => {
            const tt = connection.getSchema().table(entity)
            return connection
                .select()
                .from(tt)
                .where(
                    lf.op.or(
                        tt.col("entity0Id").in(tizz),
                        tt.col("entity1Id").in(tizz),
                    ),
                )
                .exec() as Promise<T[]>
        })
    }

    observeAll(handler: (itemzz: T[]) => void) {
        return this.crud.observeAll(handler)
    }

    update(data: T) {
        return this.crud.update(data)
    }
}
