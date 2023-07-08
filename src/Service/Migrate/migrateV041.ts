const Version = 41

export default function migrateV041(db: LB.DBData, preset: LB.AppInfoData) {
    if (db.version === Version) {
        db.version = Version + 1
    } else {
        return
    }

    db.tables.ModuleAction.forEach((item) => (item.routeName = ""))
}
