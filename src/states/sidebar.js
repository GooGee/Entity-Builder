class SideBar {
    constructor() {
        this.title = ''
        this.item = null
        this.manager = null
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
        if (item) {
            this.item = item
            return
        }

        this.item = this.first
    }
}

export default new SideBar()
