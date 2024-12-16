import makeModuleAction from "@/Database/Factory/makeModuleAction"
import { getHttpMethod } from "@/Database/Factory/makePath"
import { HttpMethod } from "@/Model/Oapi"

const Version = 50

export default function migrate(db: LB.DBData, preset: LB.AppInfoData) {
    if (db.version === Version) {
        db.version = Version + 1
    } else {
        return
    }

    if (db.tables.ModuleAction.length === 0) {
        const ma = makeModuleAction(
            db.tables.Directory[0],
            db.tables.Entity[0],
            db.tables.Module[0],
        )
        db.tables.ModuleAction.push({ ...ma, id: 1 })
    }
    const ma = db.tables.ModuleAction[0]

    const map: Map<number, number> = new Map()
    const methodMap: Map<number, string> = new Map()
    db.tables.PathMethod.forEach(function (item) {
        map.set(item.pathId, item.moduleActionId)
        methodMap.set(item.pathId, item.method)
    })

    db.tables.Path.forEach(function (item) {
        const moduleActionId = map.get(item.id) ?? ma.id
        item.moduleActionId = moduleActionId
        item.middlewarezz = []
        item.method = methodMap.get(item.id) ?? getHttpMethod(item.name)
    })

    db.tables.PathMethod = []
}
