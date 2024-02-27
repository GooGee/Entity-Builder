export default function importPreset(db: LB.DBData, preset: LB.AppInfoData,) {
    importMissing(db.tables.Collection, preset.db.tables.Collection)
    importMissing(db.tables.CollectionItem, preset.db.tables.CollectionItem)
    importMissing(db.tables.Directory, preset.db.tables.Directory)
    importMissing(db.tables.DoctrineColumnType, preset.db.tables.DoctrineColumnType)
    importMissing(db.tables.File, preset.db.tables.File)
    importMissing(db.tables.Entity, preset.db.tables.Entity)
    importMissing(db.tables.TypeFormat, preset.db.tables.TypeFormat)
    importMissing(db.tables.Column, preset.db.tables.Column)
    importMissing(db.tables.ColumnConstraint, preset.db.tables.ColumnConstraint)
}

function importMissing(itemzz: LB.IdItem[], preset: LB.IdItem[]) {
    const map = new Map(itemzz.map((item) => [item.id, item]))
    preset.forEach(function (item) {
        const found = map.get(item.id)
        if (found) {
            return
        }

        itemzz.push(item)
    })
}
