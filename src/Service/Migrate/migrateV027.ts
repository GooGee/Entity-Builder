const Version = 27

export default function migrateV027(db: LB.DBData, preset: LB.AppInfoData) {
    if (db.version === Version) {
        db.version = Version + 1
    } else {
        return
    }

    db.tables.WuColumnConstraint = []
}
