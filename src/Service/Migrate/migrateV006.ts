const Version = 6

export default function migrateV006(db: LB.DBData) {
    if (db.version === Version) {
        db.version = Version + 1
    } else {
        return
    }

    db.tables.PathMethod.forEach((item) => (item.middlewarezz = []))
}
