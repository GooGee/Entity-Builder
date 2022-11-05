import { putSetting } from "@/api"
import { exportDB } from "@/Database/getDBC"
import useOapiStore from "@/Store/useOapiStore"
import useSettingStore from "@/Store/useSettingStore"

const IntervalTime = 11222
let amount = 0

export default function startSaveTask(data: string) {
    setInterval(function () {
        exportDB().then(function (db) {
            const text = JSON.stringify({
                db,
                oapi: useOapiStore.getState(),
                setting: useSettingStore.getState(),
            })
            if (text === data) {
                return
            }
            data = text
            amount += 1
            putSetting(data, amount % 11 === 0)
        })
    }, IntervalTime)
}
