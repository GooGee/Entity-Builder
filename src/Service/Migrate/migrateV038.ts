import { makeIdNameMap } from "@/Factory/makeMap"

const Version = 38

export default function migrateV038(db: LB.DBData, preset: LB.AppInfoData) {
    if (db.version === Version) {
        db.version = Version + 1
    } else {
        return
    }

    const map = makeIdNameMap(db.tables.Directory)

    db.tables.ModuleAction.forEach(function (item) {
        item.name = map.get(item.directoryId) ?? ""
    })
}
