const Version = 14

export default function migrateV014(db: LB.DBData, preset: LB.AppInfoData) {
    if (db.version === Version) {
        db.version = Version + 1
    } else {
        return
    }

    db.tables.Module = preset.db.tables.Module
    db.tables.ModuleAction.forEach((item) => (item.moduleId = 1000))
    db.tables.Path.forEach((item) => (item.moduleId = 1000))
}
