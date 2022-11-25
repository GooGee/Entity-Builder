import { putSetting } from "@/api"
import { exportDB } from "@/Database/getDBC"
import useOapiStore from "@/Store/useOapiStore"
import useSettingStore from "@/Store/useSettingStore"

const SaveInterval = 1222
const NewBackupAfter = 333

export default function startSaveTask(data: string) {
    let amount = 0
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
            putSetting(data, amount === NewBackupAfter)
            if (amount === NewBackupAfter) {
                amount = 0
            }
        })
    }, SaveInterval)
}
