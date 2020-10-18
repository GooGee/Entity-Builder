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
            const re = new RegExp(this.keyword, 'i')
            return this.manager.list.filter(item => item.name.search(re) > -1)
        }
        return this.manager.list
    }
}
