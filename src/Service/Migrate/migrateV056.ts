
const Version = 56

export default function migrate(db: LB.DBData, preset: LB.AppInfoData) {
    if (db.version === Version) {
        db.version = Version + 1
    } else {
        return
    }

    db.tables.Wu.forEach(function (item) {
        item.includeAll = false
    })
}
