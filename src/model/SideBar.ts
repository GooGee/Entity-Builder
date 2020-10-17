import UniqueItem from './Base/UniqueItem'
import UniqueList from './Base/UniqueList'

export default class SideBar {
    readonly manager: UniqueList<UniqueItem> | null = null
    item: UniqueItem | null = null
    keyword: string = ''

    constructor(manager: UniqueList<UniqueItem>) {
        this.manager = manager
    }

    get list() {
        if (!this.manager) {
            return []
        }

        if (this.keyword) {
            return this.manager.list.filter(item => item.name.includes(this.keyword))
        }
        return this.manager.list
    }
}
