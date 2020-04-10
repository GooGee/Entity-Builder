import { Dialogue } from './dialogue'

class ListDialogue extends Dialogue {
    constructor() {
        super()
        this.keyword = ''
        this.textKey = ''
        this.list = []
        this.selected = null
    }

    get filtered() {
        if (this.keyword) {
            const re = new RegExp(this.keyword, 'i')
            return this.list.filter(item => {
                if (this.textKey) {
                    return item[this.textKey].search(re) > -1
                }

                return item.search(re) > -1
            })
        }

        return this.list
    }

    show(list, textKey, title, callback) {
        this.list = list
        this.textKey = textKey
        this.keyword = ''
        this.selected = null
        super.show(title, callback)
    }

    select(item) {
        this.selected = item
    }
}

export default new ListDialogue()
