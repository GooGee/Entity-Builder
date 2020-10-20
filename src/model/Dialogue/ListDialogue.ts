import Dialogue from './Dialogue'
import Item from '../Base/Item'
import UniqueItem from '../Base/UniqueItem'

export default class ListDialogue extends Dialogue {
    keyword: string = ''
    source: Array<UniqueItem> = []
    selected: Item | null = null
    showBlank: boolean = false

    get list() {
        if (this.keyword) {
            const re = new RegExp(this.keyword, 'i')
            return this.source.filter(item => item.name.search(re) > -1)
        }

        return this.source
    }

    showList(list: Array<UniqueItem>, title: string, callback: CallableFunction, size: string = 'md') {
        this.source = list
        this.keyword = ''
        this.selected = null
        this.showBlank = false
        this.size = size
        super.show(title, callback)
    }

    showWithBlank(list: Array<UniqueItem>, title: string, callback: CallableFunction, size: string = 'md') {
        this.showList(list, title, callback, size)
        this.showBlank = true
    }

    select(item: Item) {
        this.selected = item
        if (this.callback) {
            this.callback(true, item)
        }
    }
}
