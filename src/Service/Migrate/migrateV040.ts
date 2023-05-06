const Version = 40

export default function migrateV040(db: LB.DBData, preset: LB.AppInfoData) {
    if (db.version === Version) {
        db.version = Version + 1
    } else {
        return
    }

    db.tables.Column.forEach((item) => (item.hidden = false))

    const name = "TypeFormat"

    if (db.tables.Collection.find((item) => item.name === name)) {
        return
    }

    const collection = preset.db.tables.Collection.find((item) => item.name === name)

    if (collection === undefined) {
        throw new Error(`Collection ${name} not found`)
    }

    db.tables.Collection.push(collection)

    const tfzz = preset.db.tables.CollectionItem.filter(
        (item) => item.collectionId === collection.id,
    )
    db.tables.CollectionItem.push(...tfzz)
}
