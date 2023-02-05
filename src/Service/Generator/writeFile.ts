import { putFile, readFilezzInFolder } from "@/api"
import { refreshDisk } from "@/Bridge/sendToJava"
import { exportDB } from "@/Database/getDBC"
import makeLinkedTreeMap from "@/Factory/makeLinkedTreeMap"
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
import { callCode } from "./runCode"

export default function writeFile(
    file: LB.File,
    entity: LB.Entity,
    module: LB.Module | undefined = undefined,
    ma: LB.ModuleAction | undefined = undefined,
    action: string,
    psr4: LB.StringMap,
) {
    return readFilezzInFolder(getDirectoryName("code")).then((response) =>
        exportDB().then((db) => {
            const clone = cloneDeep(db)
            const fileMap = response.data.data
            const treeMap = makeLinkedTreeMap(db.tables.Directory)
            const treeHelper = makeTreeHelper(treeMap, psr4)
            const data: LB.DataForScript = {
                file,
                entity,
                module,
                ma,
                db: clone,
                dependencyzz: [],
                fileMap,
                lodash,
                tree: treeHelper,
                treeMap,
                action,
                helper: {},
            }

            if (HelperCodeFileName in fileMap) {
                callCode(fileMap[HelperCodeFileName], data)
            }

            const jsn = getCodeFileName(file, ScriptExtention)
            if (jsn in fileMap) {
                callCode(fileMap[jsn], data)
            } else {
                console.warn(jsn + " not exist")
            }

            const tn = getCodeFileName(file, TemplateExtention)
            if (tn in fileMap) {
                nunjucks.configure({ autoescape: false })
                const content = nunjucks.renderString(fileMap[tn], data)

                const name = treeHelper.getFileFullName(file, entity, action)
                return putFile(name, content).then((response) => {
                    refreshDisk()
                    return response
                })
            }

            throw new Error(tn + " not exist")
        }),
    )
}
