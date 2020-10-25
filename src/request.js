import axios from 'axios'
import FileSaver from 'file-saver'

const Version = '2.1'

let request = null
let connected = false

export function isConnected() {
    return connected
}

function create(server) {
    request = axios.create({
        baseURL: server,
        timeout: 11000,
    })

    request.interceptors.response.use(
        response => {
            const data = response.data
            checkVersion(data)
            connected = true
            return data
        },
        error => {
            if (!connected) {
                request = null
            }
            return Promise.reject(error)
        },
    )
}

function checkVersion(data) {
    if (data.version) {
        const php = data.version.split('.')
        const require = Version.split('.')
        if (php[0] === require[0]) {
            if (php[1] - require[1] >= 0) {
                return
            }
        }
    }

    throw new Error(`Version does not match!\nPHP package version: ${data.version}\nRequired version: ${Version}`)
}

export function connect(server) {
    create(server)
    return load()
}

export function getErrorMessage(error) {
    if ('string' === typeof error) {
        return error
    }

    if (error.response) {
        if (error.response.data.message) {
            return error.response.data.message
        }
    }

    if (error.message) {
        return error.message
    }

    return 'Error'
}

export function load() {
    return request.get('/entity')
}

export function readDB() {
    return request.get('/entity/table')
}

export function save(project) {
    return request.post('/entity', {
        project: JSON.stringify(project),
    })
}

export function deploy(data) {
    return request.post('/entity/code', {
        files: data,
    })
}

export function download(name, text) {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    FileSaver.saveAs(blob, name)
}
