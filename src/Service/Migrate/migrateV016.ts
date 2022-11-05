const Version = 16

export default function migrateV016(db: LB.DBData, preset: LB.AppInfoData) {
    if (db.version === Version) {
        db.version = Version + 1
    } else {
        return
    }

    db.tables.File.forEach((item: any) => (item.directoryId = item.parentId))
}
