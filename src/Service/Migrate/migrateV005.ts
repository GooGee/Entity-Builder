import makeTypeFormat from "@/Database/Factory/makeTypeFormat"

const Version = 5

export default function migrateV005(db: LB.DBData) {
    if (db.version === Version) {
        db.version = Version + 1
    } else {
        return
    }

    db.tables.Request.forEach((item) => (item.tf = makeTypeFormat()))
    db.tables.Response.forEach((item) => (item.tf = makeTypeFormat()))
}
