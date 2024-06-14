import makeCollection from "@/Database/Factory/makeCollection"

const Version = 35

export default function migrateV035(db: LB.DBData, preset: LB.AppInfoData) {
    if (db.version === Version) {
        db.version = Version + 1
    } else {
        return
    }

    // db.tables.Column.forEach(function (item) {
    //     item.raField = "TextField"
    //     item.raInput = "TextField"
    // })

    // const data = makeCollection("RAC") as LB.Collection
    // data.id = 17
    // db.tables.Collection.push(data)
}
