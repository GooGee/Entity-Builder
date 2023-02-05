const Version = 23

export default function migrateV023(db: LB.DBData, preset: LB.AppInfoData) {
    if (db.version === Version) {
        db.version = Version + 1
    } else {
        return
    }

    // rename Schema to Entity
}
