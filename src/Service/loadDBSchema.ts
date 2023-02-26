import makeColumn from "@/Database/Factory/makeColumn"
import makeEntity from "@/Database/Factory/makeEntity"
import { connectEntityBy } from "@/Database/Factory/makeRelation"
import makeTypeFormat from "@/Database/Factory/makeTypeFormat"
import { exportDB } from "@/Database/getDBC"
import {
    makeColumnCRUD,
    makeIndexCRUD,
    makeIndexColumnCRUD,
    makeEntityCRUD,
    makeTypeFormatCRUD,
} from "@/Database/makeCRUD"
import RelationType from "@/Database/RelationType"
import useDoctrineColumnTypezzStore from "@/Store/useDoctrineColumnTypezzStore"
import lodash from "lodash"
import getCollectionItemzz from "./getCollectionItemzz"

function createColumn(
    item: LB.DoctrineColumn,
    entity: LB.Entity,
    rozz: LB.CollectionItem[],
    dct?: LB.DoctrineColumnType,
) {
    // console.log(`createColumn ${item.name}`)
    let value = ""
    if (item.default === null) {
        //
    } else {
        if (["", "''", '""'].includes(item.default)) {
            value = "''"
        } else {
            value = item.default
        }
    }

    const data = makeColumn(
        entity.id,
        item.name,
        item.type,
        value,
        item.length,
        rozz,
        dct,
    )
    data.comment = item.comment
    data.nullable = item.nullable
    data.scale = item.scale
    data.unsigned = item.unsigned
    return makeColumnCRUD()
        .create(data)
        .then((item) => {
            const data = makeTypeFormat(dct?.oapiType as any)
            data.ownerColumnId = item.id
            return makeTypeFormatCRUD()
                .create(data)
                .then(() => item)
        })
}

function createIndex(item: LB.DoctrineIndex, entity: LB.Entity, columnzz: LB.Column[]) {
    return makeIndexCRUD()
        .create({ entityId: entity.id, type: item.type })
        .then(function (response) {
            const zz = item.columnzz.map((name, index) => {
                const found = columnzz.find((item) => item.name === name)!
                return {
                    indexId: response.id,
                    columnId: found.id,
                    sort: index + 1,
                }
            })
            return makeIndexColumnCRUD().createMany(zz)
        })
}

function createRelation(entity0: LB.Entity, entity1: LB.Entity, fki: number) {
    console.log(`createRelation ${entity0.name} - ${entity1.name}`)
    return connectEntityBy(RelationType.OneToMany, entity0, entity1, fki)
}

function createTable(item: LB.DoctrineTable) {
    console.log(`createTable ${item.name}`)
    const name = lodash.startCase(item.name).replaceAll(" ", "")
    const table = name === item.name ? "" : item.name
    const data = makeEntity(name, item.comment, table)
    return makeEntityCRUD().create(data)
}

export default async function loadDBSchema(ds: LB.DoctrineSchema) {
    const store = useDoctrineColumnTypezzStore.getState()
    const rozz = getCollectionItemzz("ReadOnlyColumn")
    const tablezz = ds.tablezz.filter((item) => item.included)

    const tm: Map<string, LB.Entity> = new Map()
    await exportDB().then((response) =>
        response.tables.Entity.forEach((item) =>
            tm.set(item.table ? item.table : item.name, item),
        ),
    )
    for (const table of tablezz) {
        await createTable(table).then((response) => tm.set(table.name, response))
    }

    const tcm: Map<string, LB.Column[]> = new Map()
    for (const table of tablezz) {
        for (const item of table.columnzz) {
            let found = tcm.get(table.name)
            if (found === undefined) {
                found = []
                tcm.set(table.name, found)
            }
            await createColumn(
                item,
                tm.get(table.name)!,
                rozz,
                store.findByName(item.type),
            ).then((response) => found!.push(response))
        }
    }

    for (const table of tablezz) {
        const columnzz = tcm.get(table.name)!
        const set: Set<string> = new Set()
        for (const item of table.relationzz) {
            if (item.columnzz.length === 1) {
                set.add(item.columnzz[0])
            }
            const fk = columnzz.find((column) => column.name === item.columnzz[0])!
            await createRelation(tm.get(item.schema)!, tm.get(table.name)!, fk.id)
        }

        for (const item of table.indexzz) {
            if (item.columnzz.length === 1) {
                if (set.has(item.columnzz[0]) && item.type === "index") {
                    // skip foreign key
                    break
                }
            }
            await createIndex(item, tm.get(table.name)!, tcm.get(table.name)!)
        }
    }

    return tablezz.length
}
