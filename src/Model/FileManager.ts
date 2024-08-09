import Constant from "./Constant"

export const ScriptExtention = ".js"
export const TemplateExtention = ".txt"

export const FactoryCodeFileName = "code-factory.js"
export const HelperCodeFileName = "code-helper.js"
export const MigrationCodeFileName = "code-migration.js"
export const ValidationCodeFileName = "code-validation.js"

export function getDirectoryName(name: string) {
    return Constant.Folder + "/" + name
}

export function getCodeFileName(file: LB.File, extention: string) {
    return `file-${file.id + extention}`
}

export function getFileFullNameInCode(name: string) {
    return Constant.Folder + "/code" + APP_VERSION_NUMBER + '/' + name
}
