import sss from './state.js'

const bridge = {
    load() {
        const text = window.JavaBridge.load()
        console.log(text)
        if (text) {
            const data = JSON.parse(text)
            return sss.load(data)
        }
        return sss.create('Project')
    },
    make(file, text) {
        const data = {
            file,
            text,
        }
        window.JavaBridge.make(JSON.stringify(data))
    },
    save(project) {
        window.JavaBridge.save(JSON.stringify(project))
    },
    readDB() {
        const text = window.JavaBridge.readDB()
        console.log(text)
        if (text) {
            return JSON.parse(text)
        }
        return null
    },
}

window.bridge = bridge

export default bridge
