import makeTypeFormat from "@/Database/Factory/makeTypeFormat"

const Version = 8

export default function migrateV008(db: LB.DBData) {
    if (db.version === Version) {
        db.version = Version + 1
    } else {
        return
    }

    db.tables.Column.forEach((item) => change(item.tf))
    db.tables.Parameter.forEach((item) => change(item.tf))
    db.tables.Request.forEach((item) => change(item.tf))
    db.tables.Response.forEach((item) => change(item.tf))
    db.tables.WuChild.forEach((item) => {
        const old = item as any
        if (old.reference) {
            item.tf = makeTypeFormat(old.reference.kind, old.reference.targetId)
            item.tf.argumentzz = old.reference.argumentzz
            item.tf.argumentzz.forEach((item) => change(item))
            delete old.reference
        }
    })

    function change(tf: LB.TypeFormat) {
        const old = tf as any
        if (old.reference) {
            tf.targetId = old.reference.targetId
            tf.argumentzz = old.reference.argumentzz
            tf.argumentzz.forEach((item) => change(item))
            delete old.reference
        }
    }
}
