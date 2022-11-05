const Version = 17

export default function migrateV017(db: LB.DBData, preset: LB.AppInfoData) {
    if (db.version === Version) {
        db.version = Version + 1
    } else {
        return
    }

    db.tables.Parameter.forEach((item) => (item.constraintzz = []))
}
