import { putFile } from "@/api"
import makeJavaBridge from "@/Bridge/makeJavaBridge"
import { refreshDisk } from "@/Bridge/sendToJava"
import { importDB } from "@/Database/getDBC"
import { getDirectoryName } from "@/Model/FileManager"
import useModulePageStore from "@/Store/useModulePageStore"
import useOapiStore from "@/Store/useOapiStore"
import usePsr4Store from "@/Store/usePsr4Store"
import checkVersion from "./checkVersion"
import migrate from "./Migrate/migrate"
import observe from "./observe"
import startSaveTask from "./startSaveTask"
import validateData from "./validateData"
import importPreset from "./importPreset"

async function load(data: LB.AppInfoData | null, text: string | null, needImport = false,) {
    makeJavaBridge()

    const preset = (await fetch("preset.json").then((r) => r.json())) as LB.AppInfoData
    if (data === null) {
        data = preset
    } else {
        validateData(data)
    }
    useOapiStore.getState().setOAPI(data.oapi)
    migrate(data.db, text, preset)
    if (needImport) {
        importPreset(data.db, preset)
    }
    return importDB(data.db)
        .then(() => useModulePageStore.setState({ item: data?.db.tables.Module[0] }))
        .then(observe)
}

function saveDTS() {
    const file = "index.d.ts"
    return fetch(file)
        .then((response) => response.text())
        .then((text) => putFile(getDirectoryName(file), text))
        .then(refreshDisk)
}

export default function start(info: LB.AppInfo, needImport = false,) {
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
    return load(aid, info.data, needImport).then(() => startSaveTask(info.data ?? ""))
}

export function startDemo() {
    return load(null, null)
}
