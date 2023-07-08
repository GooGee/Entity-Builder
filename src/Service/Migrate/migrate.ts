import { putFile } from "@/api"
import { getDirectoryName } from "@/Model/FileManager"
import migrateV037 from "./migrateV037"
import migrateV038 from "./migrateV038"
import migrateV039 from "./migrateV039"
import migrateV040 from "./migrateV040"
import migrateV041 from "./migrateV041"

const BreakingVersion = 37

export const Version = 42

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

    migrateV037(db, preset)
    migrateV038(db, preset)
    migrateV039(db, preset)
    migrateV040(db, preset)
    migrateV041(db, preset)
}

function backup(db: LB.DBData, text: string) {
    const version = "000" + db.version
    const dt = new Date().toISOString().replaceAll(":", "_")
    putFile(getDirectoryName(`v${version.slice(-3)}-${dt}.json`), text)
}
