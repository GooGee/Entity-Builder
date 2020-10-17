import UniqueItem from './Base/UniqueItem'
import UniqueList from './Base/UniqueList'

export default class SideBar {
    readonly manager: UniqueList<UniqueItem> | null = null
    item: UniqueItem | null = null
    search: string = ''

    constructor(manager: UniqueList<UniqueItem>) {
        this.manager = manager
    }

    get list() {
        if (!this.manager) {
            return []
        }

        if (this.search) {
            return this.manager.list.filter(item => item.name.includes(this.search))
        }
        return this.manager.list
    }
}
