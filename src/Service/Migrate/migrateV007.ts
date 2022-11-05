const Version = 7

export default function migrateV007(db: LB.DBData) {
    if (db.version === Version) {
        db.version = Version + 1
    } else {
        return
    }

    db.tables.Parameter.forEach((item) => {
        item.allowEmptyValue = false
        item.allowReserved = false
        item.explode = false
    })
}
