import { Version } from "@/Database/getDBC"

export default function validateData(data: LB.AppInfoData) {
    let valid = ["db", "oapi", "setting"].every((item) => item in data)

    if (typeof data.db.version === "number") {
        if (data.db.version > Version) {
            throw new Error(`Cannot load version ${data.db.version} data`)
        }
    } else {
        valid = false
    }

    if (valid === false) {
        throw new Error("Cannot load corrupted data")
    }
}
