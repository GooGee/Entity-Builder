const Version = 15

export default function migrateV015(db: LB.DBData, preset: LB.AppInfoData) {
    if (db.version === Version) {
        db.version = Version + 1
    } else {
        return
    }

    db.tables.Directory.forEach((item) => (item.description = ""))
    db.tables.File.forEach((item) => (item.description = ""))
}
