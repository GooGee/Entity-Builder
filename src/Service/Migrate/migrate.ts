import { putFile } from "@/api"
import { getDirectoryName } from "@/Model/FileManager"
import migrateV055 from "./migrateV055"
import migrateV056 from "./migrateV056"

const BreakingVersion = 55

export const Version = 57

export default function migrate(
    db: LB.DBData,
    text: string | null,
    preset: LB.AppInfoData,
) {
    if (db.version === Version) {
        return
    }

    if (text) {
        backup(db, text)
    }

    if (db.version < BreakingVersion) {
        throw new Error(`data version ${db.version} is no longer supported`)
    }

    migrateV055(db, preset)
    migrateV056(db, preset)
}

function backup(db: LB.DBData, text: string) {
    const version = "000" + db.version
    const dt = new Date().toISOString().replaceAll(":", "_")
    putFile(getDirectoryName(`v${version.slice(-3)}-${dt}.json`), text)
}
