import { putFile } from "@/api"
import { getDirectoryName } from "@/Model/FileManager"
import migrateV050 from "./migrateV050"

const BreakingVersion = 50

export const Version = 51

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

    migrateV050(db, preset)
}

function backup(db: LB.DBData, text: string) {
    const version = "000" + db.version
    const dt = new Date().toISOString().replaceAll(":", "_")
    putFile(getDirectoryName(`v${version.slice(-3)}-${dt}.json`), text)
}
