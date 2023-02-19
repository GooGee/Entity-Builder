import makeDoctrineColumnType from "@/Database/Factory/makeDoctrineColumnType"

const Version = 36

export default function migrateV036(db: LB.DBData, preset: LB.AppInfoData) {
    if (db.version === Version) {
        db.version = Version + 1
    } else {
        return
    }

    db.tables.DoctrineColumnType = []
    const dct = db.tables.Collection.find((item) => item.name === "DoctrineColumnType")
    if (dct) {
        const itemzz = db.tables.CollectionItem.filter(
            (item) => item.collectionId === dct.id,
        )
        db.tables.DoctrineColumnType = itemzz.map(function (item, index) {
            return {
                id: index + 1,
                ...makeDoctrineColumnType(item.name, item.tag),
            }
        })
    }
}
