import makeTypeFormat from "@/Database/Factory/makeTypeFormat"

const Version = 2

export default function migrateV002(db: LB.DBData) {
    if (db.version === Version) {
        db.version = Version + 1
    } else {
        return
    }

    db.tables.Column.forEach((item: any) => {
        item.tf = makeTypeFormat(item.dtoType)
        item.tf.isArray = item.dtoIsArray
        item.tf.format = item.dtoFormat
    })
}
