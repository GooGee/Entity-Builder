export default function validateData(data: LB.AppInfoData) {
    const keyzz = ["db", "oapi", "setting"]
    const valid = keyzz.every((item) => item in data)
    if (valid === false) {
        throw new Error("Cannot load corrupted data")
    }
}
