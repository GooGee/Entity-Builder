import usePsr4Store from "@/Store/usePsr4Store"
import writeFile from "./Generator/writeFile"
import { cloneDeep } from "lodash"
import { exportDB } from "@/Database/getDBC"
import useFilezzStore from "@/Store/useFilezzStore"

export function getSingleFilezz() {
    return useFilezzStore.getState().itemzz.filter(item => item.isSingle)
}

export default function install() {
    exportDB().then(function (db) {
        const copy = cloneDeep(db)
        createFile(copy)
    })
}

function createFile(db: LB.DBData) {
    const entity = db.tables.Entity[0]
    const psr4 = usePsr4Store.getState().psr4
    db.tables.File.filter((item) => item.isSingle)
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
