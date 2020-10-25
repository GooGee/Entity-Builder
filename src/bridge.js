import sss from './state.js'

const bridge = {
    load() {
        window.JavaBridge.load()
    },
    loadCB(text) {
        // console.log(text)
        if (text) {
            const data = JSON.parse(text)
            sss.load(data)
            return
        }
        sss.create('Project')
    },
    make(file, text) {
        window.JavaBridge.make(file + '*' + text)
    },
    save(project) {
        window.JavaBridge.save(JSON.stringify(project))
    },
    readDB() {
        window.JavaBridge.readDB()
    },
}

window.bridge = bridge

export default bridge
