const Version = 10

export default function migrateV010(db: LB.DBData) {
    if (db.version === Version) {
        db.version = Version + 1
    } else {
        return
    }

    db.tables.Variable.forEach((item) => (item.type = "string"))
}
