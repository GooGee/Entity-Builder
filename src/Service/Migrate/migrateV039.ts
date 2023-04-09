import { makeChildzzMap, makeIdItemMap } from "@/Factory/makeMap"

const Version = 39

export default function migrateV039(db: LB.DBData, preset: LB.AppInfoData) {
    if (db.version === Version) {
        db.version = Version + 1
    } else {
        return
    }

    const old = db.tables as Old

    const map = makeIdItemMap(db.tables.File)
    const maimafzzm = makeChildzzMap(old.ModuleActionFile, "moduleActionId")

    // @ts-ignore
    delete old.ModuleActionFile

    db.tables.ModuleAction.forEach(function (item) {
        item.filezz = []
        maimafzzm.get(item.id)?.forEach(function (maf) {
            const file = map.get(maf.fileId)
            if (file) {
                item.filezz.push({ ...file, isExtra: false })
            }
        })
    })
}

interface Old extends LB.DBTable {
    ModuleActionFile: ModuleActionFile[]
}

interface ModuleActionFile {
    id: number
    moduleActionId: number
    fileId: number
    directoryId: number
}
