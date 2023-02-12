const Version = 33

export default function migrateV033(db: LB.DBData, preset: LB.AppInfoData) {
    if (db.version === Version) {
        db.version = Version + 1
    } else {
        return
    }

    db.tables.Entity.forEach((item) => (item.table = ""))
}
