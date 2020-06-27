class SideBar {
    constructor() {
        this.title = ''
        this.search = ''
        this.item = null
        this.manager = null
    }

    get list() {
        if (this.manager) {
            if (this.search) {
                const re = new RegExp(this.search, 'i')
                return this.manager.list.filter(item => re.test(item.name))
            }
            return this.manager.list
        }
        return []
    }

    get first() {
        if (this.manager) {
            if (this.manager.list.length) {
                return this.manager.list[0]
            }
        }
        return null
    }

    make(name) {
        const item = this.manager.make(name)
        this.manager.add(item)

        if (this.title === 'Entity') {
            this.makeFile('Migration', item.FileManager)
            this.makeFile('Model', item.FileManager)
        }
    }

    makeFile(name, manager) {
        const model = manager.make(name)
        manager.add(model)
    }

    remove(item) {
        this.manager.remove(item)
        this.item = this.first
    }

    show(title, manager, item = null) {
        this.title = title
        if (Object.is(manager, this.manager)) {
            return
        }

        this.manager = manager
        this.search = ''
        if (item) {
            this.item = item
            return
        }

        this.item = this.first
    }
}

export default new SideBar()
