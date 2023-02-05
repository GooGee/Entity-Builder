import { putFile } from "@/api"
import { Version } from "@/Database/getDBC"
import { getDirectoryName } from "@/Model/FileManager"
import migrateV024 from "./migrateV024"

const BreakingVersion = 25

export default function migrate(db: LB.DBData, text: string, preset: LB.AppInfoData) {
    if (db.version === Version) {
        return
    }

    backup(db, text)

    if (db.version < BreakingVersion) {
        throw new Error(`data version ${db.version} is no longer supported`)
    }

    migrateV024(db, preset)
}

function backup(db: LB.DBData, text: string) {
    const version = "000" + db.version
    const dt = new Date().toISOString().replaceAll(":", "_")
    putFile(getDirectoryName(`v${version.slice(-3)}-${dt}.json`), text)
}
