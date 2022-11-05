const Version = 19

export default function migrateV019(db: LB.DBData, preset: LB.AppInfoData) {
    if (db.version === Version) {
        db.version = Version + 1
    } else {
        return
    }

    db.tables.Server.forEach((item) => (item.global = true))
    db.tables.ServerMap = []
}
