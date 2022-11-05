const Version = 11

export default function migrateV011(db: LB.DBData) {
    if (db.version === Version) {
        db.version = Version + 1
    } else {
        return
    }

    db.tables.Wu.forEach((item) => (item.example = ""))
}
