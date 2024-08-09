import axios from "axios"
import Constant from "./Model/Constant"

let client = createClient()

function createClient() {
    return axios.create({
        baseURL: location.origin + "/" + Constant.Name2,
        timeout: 33000,
    })
}

export function connect() {
    client = createClient()
    return readSetting()
}

function readSetting() {
    return client.get<LB.ApiResponse<LB.AppInfo>>("")
}

export function putSetting(content: string, backup = false) {
    return client.put("", { content, backup })
}

export function putFile(file: string, content: string) {
    return client.put<LB.ApiResponse<string>>("file", { file, content })
}

export function putCode(file: string, content: string) {
    return client.put<LB.ApiResponse<null>>("code", { file, content })
}

export function readFile(file: string) {
    return client.get<LB.ApiResponse<string>>("file", { params: { file } })
}

export function readFilezzInFolder(folder: string) {
    return client.get<LB.ApiResponse<LB.StringMap>>("file", { params: { folder }, })
}

export function readDBSchema() {
    return client.get<LB.ApiResponse<LB.DoctrineSchema>>("dbschema")
}

export function readMigration() {
    return client.get<LB.ApiResponse<LB.MigrationStatus>>("dbmigration")
}

export function createMigration(step: number) {
    return client.post<LB.ApiResponse<string>>("migration", { step })
}

export function createMigrationFile() {
    return client.post<LB.ApiResponse<string>>("migration/file")
}

export function deleteMigrationFile(file: string) {
    return client.delete<LB.ApiResponse<string>>("migration/file", {
        data: { file },
    })
}
