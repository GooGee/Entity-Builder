const Version = 24

export default function migrateV024(db: LB.DBData, preset: LB.AppInfoData) {
    if (db.version === Version) {
        db.version = Version + 1
    } else {
        return
    }

    // max id in preset.json
}
