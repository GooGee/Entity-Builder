import { putSetting } from "@/api"
import { exportDB } from "@/Database/getDBC"
import useOapiStore from "@/Store/useOapiStore"
import useSettingStore from "@/Store/useSettingStore"
import useToastzzStore from "@/Store/useToastzzStore"

const SaveInterval = 1222
const NewBackupAfter = 33 // create a new backup file after this many changes

let amount = 0
let waiting = false

export default function startSaveTask(data: string) {
    setInterval(function () {
        if (waiting) {
            return
        }

        exportDB()
            .then(function (db) {
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
                waiting = true
                return putSetting(data, amount === NewBackupAfter).finally(function () {
                    // console.log("save at " + new Date().toISOString())
                    waiting = false
                    if (amount === NewBackupAfter) {
                        amount = 0
                    }
                })
            })
            .catch(useToastzzStore.getState().showError)
    }, SaveInterval)
}
