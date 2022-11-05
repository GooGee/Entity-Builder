import Constant from "@/Model/Constant"

export default function checkVersion(version: string) {
    if (typeof version === "string") {
        // ok
    } else {
        throw new Error("unsupported version: " + version)
    }

    const [major, minor] = version.split(".").map((value) => parseInt(value))
    const [avMajor, avMinor] = APP_VERSION.split(".").map((value) => parseInt(value))
    if (major === avMajor && minor === avMinor) {
        return
    }

    const message = `Please upgrade the PHP package ${Constant.PackageName} to version: ${APP_VERSION}`
    if (major < avMajor) {
        throw new Error(message)
    }
    if (major === avMajor) {
        if (minor < avMinor) {
            throw new Error(message)
        }
    }
    throw new Error(
        `Please upgrade the PhpStorm plugin ${Constant.Name} to version: ${version}`,
    )
}
