import axios from 'axios'
import render from './render.js'

const Version = '2.1'

let request = null

export function connect(domain) {
    request = axios.create({
        baseURL: domain,
        timeout: 33000,
    })

    request.interceptors.response.use(
        response => {
            const data = response.data
            checkVersion(data)
            return data
        },
        error => {
            return Promise.reject(error)
        },
    )

    return load()
}

export function getPreset() {
    return axios.get('preset.json')
}

export function load() {
    return request.get('/entity')
}

export function getDB() {
    return request.get('/entity/table')
}

export function save(project) {
    return request.post('/entity', {
        project: JSON.stringify(project),
    })
}

function checkVersion(data) {
    if (data.version) {
        const php = data.version.split('.')
        const require = Version.split('.')
        if (php[0] === require[0]) {
            if (php[0] - require[0] >= 0) {
                return
            }
        }
    }

    throw new Error(`Version does not match!\nPHP package version: ${data.version}\nRequired version: ${Version}`)
}

function deploy(data) {
    return request.post('/entity/code', {
        files: data,
    })
}

function pack(project, entity, file, data) {
    const name = file.layer.path + '/' + file.fileName
    data[name] = render(file, entity, project)
}

function packGroup(project, entity, data) {
    entity.FileManager.list.forEach(file => {
        pack(project, entity, file, data)
    })
}

export function deployFile(project, entity, file) {
    const data = {}
    pack(project, entity, file, data)
    return deploy(data)
}

export function deployGroup(project, entity) {
    const data = {}
    packGroup(project, entity, data)
    return deploy(data)
}

export function deployAll(project) {
    const data = {}
    project.EntityManager.list.forEach(entity => {
        packGroup(project, entity, data)
    })
    return deploy(data)
}
