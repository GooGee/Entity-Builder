const Version = 30

export default function migrateV030(db: LB.DBData, preset: LB.AppInfoData) {
    if (db.version === Version) {
        db.version = Version + 1
    } else {
        return
    }

    db.tables.ParameterMap.forEach((item) => (item.alias = ""))
}
