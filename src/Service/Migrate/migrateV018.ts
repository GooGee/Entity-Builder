const Version = 18

export default function migrateV018(db: LB.DBData, preset: LB.AppInfoData) {
    if (db.version === Version) {
        db.version = Version + 1
    } else {
        return
    }

    db.tables.ParameterMap.forEach((item: any) => {
        item.inPath = item.isPath
        item.inResponse = item.isHeader
    })
}
