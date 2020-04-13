import storage from './storage'

class Builder {
    constructor() {
        this.project = null
        this.preset = null
        this.projectList = storage.getProjectList()
    }
}

export default new Builder()
