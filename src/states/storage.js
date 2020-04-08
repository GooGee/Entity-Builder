const ProjectListKey = 'ProjectListKey'

class Storage {
    get(key, value = null) {
        const vvv = localStorage.getItem(key)
        if (vvv) {
            return vvv
        }
        return value
    }

    save(key, value) {
        localStorage.setItem(key, value)
    }

    getJSON(key, value = null) {
        const json = this.get(key)
        if (json) {
            return JSON.parse(json)
        }
        return value
    }

    saveJSON(key, value) {
        this.save(key, JSON.stringify(value))
    }

    getProjectList() {
        return this.getJSON(ProjectListKey, [])
    }

    saveProjectList(value) {
        if (Array.isArray(value)) {
            // OK
        } else {
            throw new Error('Must be an array!')
        }
        this.saveJSON(ProjectListKey, value)
    }
}

export default new Storage()
