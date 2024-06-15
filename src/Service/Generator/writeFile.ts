import { putFile, readFilezzInFolder } from "@/api"
import { refreshDisk } from "@/Bridge/sendToJava"
import { exportDB } from "@/Database/getDBC"
import makeLinkedTreeMap from "@/Factory/makeLinkedTreeMap"
import { makeChildzzMap, makeIdItemMap, makeIdNameMap } from "@/Factory/makeMap"
import makeTreeHelper from "@/Factory/makeTreeHelper"
import {
    getDirectoryName,
    getCodeFileName,
    HelperCodeFileName,
    ScriptExtention,
    TemplateExtention,
} from "@/Model/FileManager"
import lodash, { cloneDeep } from "lodash"
import nunjucks from "nunjucks"
import getResponseContentColumnzz from "../getResponseContentColumnzz"
import getTypeFormatColumnzz from "../getTypeFormatColumnzz"
import { callCode } from "./runCode"

export default function writeFile(
    file: LB.File,
    entity: LB.Entity,
    module: LB.Module | undefined = undefined,
    ma: LB.ModuleAction | undefined = undefined,
    action: string,
    psr4: LB.StringMap,
    dbCopy: LB.DBData | undefined = undefined,
) {
    let cloneDB
    if (dbCopy === undefined) {
        cloneDB = exportDB().then(db => cloneDeep(db))
    } else {
        cloneDB = Promise.resolve(dbCopy)
    }

    return cloneDB.then(function (db) {
        const folder = 'code' + APP_VERSION_NUMBER
        return readFilezzInFolder(getDirectoryName(folder)).then(function (response) {
            const fileMap = response.data.data
            const treeMap = makeLinkedTreeMap(db.tables.Directory)
            const treeHelper = makeTreeHelper(treeMap, psr4)
            const ddd: LB.DataForScript = {
                file,
                entity,
                module,
                ma,
                db,
                dependencyzz: [],
                fileMap,
                getResponseContentColumnzz,
                getTypeFormatColumnzz,
                lodash,
                makeChildzzMap,
                makeIdItemMap,
                makeIdNameMap,
                tree: treeHelper,
                treeMap,
                action,
                helper: {},
            }

            if (HelperCodeFileName in fileMap) {
                callCode(fileMap[HelperCodeFileName], ddd)
            }

            const jsn = getCodeFileName(file, ScriptExtention)
            if (jsn in fileMap) {
                callCode(fileMap[jsn], ddd)
            } else {
                console.warn(jsn + " does not exist")
            }

            const tn = getCodeFileName(file, TemplateExtention)
            if (tn in fileMap) {
                nunjucks.configure({ autoescape: false })
                // render first time to set dependencyzz
                nunjucks.renderString(fileMap[tn], ddd)
                const set = new Set(ddd.dependencyzz)
                set.delete(treeHelper.getClassFullName(file, entity, action))
                ddd.dependencyzz = Array.from(set).sort((aa, bb) =>
                    aa.localeCompare(bb),
                )
                const content = nunjucks.renderString(fileMap[tn], ddd)

                const name = treeHelper.getFileFullName(file, entity, action)
                return putFile(name, content).then((response) => {
                    refreshDisk()
                    return response
                })
            }

            throw new Error(tn + " not exist")
        })
    })
}
