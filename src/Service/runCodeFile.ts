import { readFilezzInFolder } from "@/api"
import { exportDB } from "@/Database/getDBC"
import { getDirectoryName, HelperCodeFileName } from "@/Model/FileManager"
import { callCode } from "./Generator/runCode"

export default function runCodeFile(name: string, entity: LB.Entity) {
    return readFilezzInFolder(getDirectoryName("code")).then((response) =>
        exportDB().then((db) => {
            const fileMap = response.data.data
            if (name in fileMap) {
                //
            } else {
                throw new Error(name + " not found")
            }

            const data = {
                db,
                fileMap,
                entity,
                result: [],
            }
            if (HelperCodeFileName in fileMap) {
                callCode(fileMap[HelperCodeFileName], data)
            }
            callCode(fileMap[name], data)
            return data
        }),
    )
}
