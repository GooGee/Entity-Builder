const Version = 3

export default function migrateV003(db: LB.DBData) {
    if (db.version === Version) {
        db.version = Version + 1
    } else {
        return
    }

    db.tables.ModuleAction.forEach((item) => {
        item.requestId = 1
    })
}
