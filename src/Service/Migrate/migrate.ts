import { putFile } from "@/api"
import { Version } from "@/Database/getDBC"
import { getDirectoryName } from "@/Model/FileManager"
import migrateV029 from "./migrateV029"
import migrateV030 from "./migrateV030"

const BreakingVersion = 29

export default function migrate(db: LB.DBData, text: string, preset: LB.AppInfoData) {
    if (db.version === Version) {
        return
    }

    backup(db, text)

    if (db.version < BreakingVersion) {
        throw new Error(`data version ${db.version} is no longer supported`)
    }

    migrateV029(db, preset)
    migrateV030(db, preset)
}

function backup(db: LB.DBData, text: string) {
    const version = "000" + db.version
    const dt = new Date().toISOString().replaceAll(":", "_")
    putFile(getDirectoryName(`v${version.slice(-3)}-${dt}.json`), text)
}
