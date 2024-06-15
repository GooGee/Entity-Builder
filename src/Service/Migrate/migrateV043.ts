const Version = 43

export default function migrateV042(db: LB.DBData, preset: LB.AppInfoData) {
    if (db.version === Version) {
        db.version = Version + 1
    } else {
        return
    }

    db.tables.File.forEach((item) => item.isSingle = false)
}
