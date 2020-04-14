import Entity from './entity.js'
import storage from './storage'

class Builder {
    constructor() {
        this.project = null
        this.preset = null
        this.projectList = storage.getProjectList()
        Entity.ee.on(Entity.EventEnum.AfterItemAdd, this.listenItemAdd)
    }

    listenItemAdd(sender, item) {
        if (item.constructor.name === 'Entity') {
            const table = item.FileManager.make('Migration')
            item.FileManager.add(table)
            const model = item.FileManager.make('Model')
            item.FileManager.add(model)
        }
    }

}

export default new Builder()
