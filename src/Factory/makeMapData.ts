import { makeIdItemMap, makeChildzzMap } from "./makeMap"

export type MapDataType = ReturnType<typeof makeMapData>

export default function makeMapData(db: LB.DBData) {
    const cicm = makeIdItemMap(db.tables.Column)
    const wiczzm: Map<number, LB.ColumnWithAlias[]> = new Map()
    db.tables.WuColumn.forEach((item) => {
        let found = wiczzm.get(item.wuId)
        if (found === undefined) {
            found = []
            wiczzm.set(item.wuId, found)
        }

        const column = cicm.get(item.columnId)!
        let name = column.name
        if (item.alias) {
            name = item.alias
        }
        found.push({ ...column, name, alias: name, wuColumnId: item.id })
    })

    const tfzzm: Map<number, LB.TypeFormat[]> = makeChildzzMap(
        db.tables.TypeFormat,
        "ownerId",
    )

    const wiwm = makeIdItemMap(db.tables.Wu)

    const wiwkzzm: Map<number, LB.TypeFormat[]> = makeChildzzMap(
        db.tables.TypeFormat,
        "ownerWuChildId",
    )
    const wiwpzzm: Map<number, LB.WuParameter[]> = makeChildzzMap(
        db.tables.WuParameter,
        "wuId",
    )

    return {
        cicm,
        tfzzm,
        wiczzm,
        wiwm,
        wiwkzzm,
        wiwpzzm,
    }
}
