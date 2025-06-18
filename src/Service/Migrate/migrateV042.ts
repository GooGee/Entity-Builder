const Version = 42

export default function migrateV042(db: LB.DBData, preset: LB.AppInfoData) {
    if (db.version === Version) {
        db.version = Version + 1
    } else {
        return
    }

    db.tables.ModuleAction.forEach((item) => {
        // item.inOapi = true
        item.inRoute = true
    })
}
