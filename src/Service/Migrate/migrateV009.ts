const Version = 9

export default function migrateV009(db: LB.DBData) {
    if (db.version === Version) {
        db.version = Version + 1
    } else {
        return
    }

    db.tables.Column.forEach((item) => change(item.tf))
    db.tables.Parameter.forEach((item) => change(item.tf))
    db.tables.Request.forEach((item) => change(item.tf))
    db.tables.Response.forEach((item) => change(item.tf))
    db.tables.WuChild.forEach((item) => change(item.tf))

    function change(tf: LB.TypeFormat) {
        tf.nullable = false
    }
}
