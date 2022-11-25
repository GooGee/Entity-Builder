import makeColumn, { setColumnTypeFormat } from "@/Database/Factory/makeColumn"
import { connectSchemaBy } from "@/Database/Factory/makeRelation"
import makeSchema from "@/Database/Factory/makeSchema"
import { exportDB } from "@/Database/getDBC"
import {
    makeColumnCRUD,
    makeIndexColumnCRUD,
    makeIndexCRUD,
    makeSchemaCRUD,
} from "@/Database/makeCRUD"
import RelationType from "@/Database/RelationType"
import getCollectionItemzz from "./getCollectionItemzz"

function createColumn(
    item: LB.DoctrineColumn,
    schema: LB.Schema,
    rozz: LB.CollectionItem[],
    cizz: LB.CollectionItem[],
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
    const data = makeColumn(schema.id, item.name, item.type, value, item.length, rozz)
    data.comment = item.comment
    data.nullable = item.nullable
    data.scale = item.scale
    data.unsigned = item.unsigned
    setColumnTypeFormat(data, cizz)
    return makeColumnCRUD().create(data)
}

function createIndex(item: LB.DoctrineIndex, schema: LB.Schema, columnzz: LB.Column[]) {
    return makeIndexCRUD()
        .create({ schemaId: schema.id, type: item.type })
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

function createRelation(schema0: LB.Schema, schema1: LB.Schema, fki: number) {
    console.log(`createRelation ${schema0.name} - ${schema1.name}`)
    return connectSchemaBy(RelationType.OneToMany, schema0, schema1, fki)
}

function createTable(item: LB.DoctrineTable) {
    console.log(`createTable ${item.name}`)
    const data = makeSchema(item.name, item.comment)
    return makeSchemaCRUD().create(data)
}

export default async function loadDBSchema(schema: LB.DoctrineSchema) {
    const cizz = getCollectionItemzz("DoctrineColumnType")
    const rozz = getCollectionItemzz("ReadOnlyColumn")
    const tablezz = schema.tablezz.filter((item) => item.included)

    const tm: Map<string, LB.Schema> = new Map()
    await exportDB().then((response) =>
        response.tables.Schema.forEach((item) => tm.set(item.name, item)),
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
            await createColumn(item, tm.get(table.name)!, rozz, cizz).then((response) =>
                found!.push(response),
            )
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
