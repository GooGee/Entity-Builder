const Version = 13

export default function migrateV013(db: LB.DBData) {
    if (db.version === Version) {
        db.version = Version + 1
    } else {
        return
    }

    const collection = db.tables.Collection.find((item) => item.name === "ModuleAction")
    if (collection) {
        collection.tagDescription = collection.valueDescription
        collection.valueDescription = ""
        db.tables.CollectionItem.forEach((item) => {
            if (item.collectionId === collection.id) {
                item.tag = item.value
                item.value = ""
            }
        })
    }
}
