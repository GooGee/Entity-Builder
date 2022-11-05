const Version = 4

export default function migrateV004(db: LB.DBData) {
    if (db.version === Version) {
        db.version = Version + 1
    } else {
        return
    }

    // db.tables.Column.forEach(
    //     (item) => (item.tf.reference = makeReference(OapiType.Wu, 0)),
    // )
    // db.tables.Parameter.forEach(
    //     (item) => (item.tf.reference = makeReference(OapiType.Wu, 0)),
    // )
}
