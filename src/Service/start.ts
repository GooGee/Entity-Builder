import { putFile } from "@/api"
import makeJavaBridge from "@/Bridge/makeJavaBridge"
import importDB from "@/Database/importDB"
import checkVersion from "./checkVersion"
import startSaveTask from "./startSaveTask"
import migrate from "./Migrate/migrate"
import { getDirectoryName } from "@/Model/FileManager"
import { refreshDisk } from "@/Bridge/sendToJava"
import useOapiStore from "@/Store/useOapiStore"
import observe from "./observe"
import usePsr4Store from "@/Store/usePsr4Store"
import validateData from "./validateData"

async function load(data: LB.AppInfoData | null, text: string | null) {
    makeJavaBridge()

    const preset = (await fetch("preset.json").then((r) => r.json())) as LB.AppInfoData
    if (data === null) {
        data = preset
    } else {
        validateData(data)
        useOapiStore.getState().setOAPI(data.oapi)
    }
    migrate(data.db, text!, preset)
    return importDB(data.db).then(() => observe())
}

function saveDTS() {
    const file = "index.d.ts"
    return fetch(file)
        .then((response) => response.text())
        .then((text) => putFile(getDirectoryName(file), text))
        .then(() => refreshDisk())
}

export default function start(info: LB.AppInfo) {
    checkVersion(info.version)
    saveDTS()

    let aid = null
    if (info.data) {
        aid = JSON.parse(info.data) as LB.AppInfoData
        const composer = JSON.parse(info.composer) as LB.Composer
        usePsr4Store.getState().setPsr4({
            ...composer["autoload-dev"]["psr-4"],
            ...composer.autoload["psr-4"],
        })
    }
    return load(aid, info.data).then(() => startSaveTask(info.data ?? ""))
}

export function startDemo() {
    return load(null, null)
}
