import makeTypeFormat from "@/Database/Factory/makeTypeFormat"

const Version = 12

export default function migrateV012(db: LB.DBData) {
    if (db.version === Version) {
        db.version = Version + 1
    } else {
        return
    }

    db.tables.Wu.forEach((item) => {
        item.isMap = false
        item.tf = makeTypeFormat()
    })
}
