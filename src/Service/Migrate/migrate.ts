import { putFile } from "@/api"
import { Version } from "@/Database/getDBC"
import { getDirectoryName } from "@/Model/FileManager"
import migrateV015 from "./migrateV015"
import migrateV016 from "./migrateV016"
import migrateV017 from "./migrateV017"
import migrateV018 from "./migrateV018"
import migrateV019 from "./migrateV019"
import migrateV020 from "./migrateV020"
import migrateV021 from "./migrateV021"

const BreakingVersion = 15

export default function migrate(db: LB.DBData, text: string, preset: LB.AppInfoData) {
    if (db.version === Version) {
        return
    }

    backup(db, text)

    if (db.version < BreakingVersion) {
        throw new Error(`data version ${db.version} is no longer supported`)
    }

    migrateV015(db, preset)
    migrateV016(db, preset)
    migrateV017(db, preset)
    migrateV018(db, preset)
    migrateV019(db, preset)
    migrateV020(db, preset)
    migrateV021(db, preset)
}

function backup(db: LB.DBData, text: string) {
    const version = "000" + db.version
    const dt = new Date().toISOString().replaceAll(":", "_")
    putFile(getDirectoryName(`v${version.slice(-3)}-${dt}.json`), text)
}
