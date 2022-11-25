const Version = 21

export default function migrateV021(db: LB.DBData, preset: LB.AppInfoData) {
    if (db.version === Version) {
        db.version = Version + 1
    } else {
        return
    }

    db.tables.WuParameter.forEach((item) => (item.isWu = false))
}
