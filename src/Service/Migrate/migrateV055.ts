
const Version = 55

export default function migrate(db: LB.DBData, preset: LB.AppInfoData) {
    if (db.version === Version) {
        db.version = Version + 1
    } else {
        return
    }

    db.tables.ModuleAction.forEach(function (item) {
        item.responseWuId = 1
    })
}
