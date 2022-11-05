const Version = 20

export default function migrateV020(db: LB.DBData, preset: LB.AppInfoData) {
    if (db.version === Version) {
        db.version = Version + 1
    } else {
        return
    }

    db.tables.ModuleAction.forEach(
        (item) =>
            (item.operationId = `operation_${item.collectionItemId}_${item.moduleId}_${item.schemaId}`),
    )
}
