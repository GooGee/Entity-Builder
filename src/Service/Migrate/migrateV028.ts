const Version = 28

export default function migrateV028(db: LB.DBData, preset: LB.AppInfoData) {
    if (db.version === Version) {
        db.version = Version + 1
    } else {
        return
    }

    db.tables.Entity.forEach((item) => (item.isTable = true))
}
