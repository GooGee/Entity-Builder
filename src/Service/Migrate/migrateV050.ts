import { HttpMethod } from "@/Model/Oapi"

const Version = 50

export default function migrate(db: LB.DBData, preset: LB.AppInfoData) {
    if (db.version === Version) {
        db.version = Version + 1
    } else {
        return
    }

    db.tables.Path.forEach(function (item) {
        item.method = HttpMethod.get
        item.middlewarezz = []
    })

    db.tables.PathMethod = []
}
