import usePsr4Store from "@/Store/usePsr4Store"
import writeFile from "./Generator/writeFile"
import { cloneDeep } from "lodash"
import { exportDB } from "@/Database/getDBC"

export const CreateFilezz = [
    'AbstractApiTestBase.php',
    'AbstractController.php',
    'AbstractReadPage.php',
    'AbstractRequest.php',
    'AbstractResponse.php',
    'AbstractModel.php',
    'AbstractUser.php',
    'ApiEvent.php',
    'ReadManyRequest.php',
    'ReadPageQueryBuilder.php',
    'ReadPageRequest.php',
]

export default function install() {
    exportDB().then(function (db) {
        const copy = cloneDeep(db)
        createFile(copy)
    })
}

function createFile(db: LB.DBData) {
    const set = new Set<string>(CreateFilezz)
    const entity = db.tables.Entity[0]
    const psr4 = usePsr4Store.getState().psr4
    db.tables.File
        .filter((item) => set.has(item.name))
        .forEach(function (file) {
            writeFile(
                file,
                entity,
                undefined,
                undefined,
                '',
                psr4,
                db,
            )
        })
}
