export default function importPreset(db: LB.DBData, preset: LB.AppInfoData,) {
    Object.keys(preset.db.tables).forEach(function (name) {
        const table = name as keyof LB.DBTable
        if (table in db.tables) {
            importMissing(db.tables[table], preset.db.tables[table])
        }
    })
}

function importMissing(itemzz: LB.IdItem[], source: LB.IdItem[]) {
    const map = new Map(itemzz.map((item) => [item.id, item]))
    source.forEach(function (item) {
        const found = map.get(item.id)
        if (found) {
            return
        }

        itemzz.push(item)
    })
}
