import { Dialogue } from './dialogue'

class ListDialogue extends Dialogue {
    constructor() {
        super()
        this.keyword = ''
        this.textKey = ''
        this.showBlank = false
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
        this.showBlank = false
        super.show(title, callback)
    }

    showWithBlank(list, textKey, title, callback) {
        this.show(list, textKey, title, callback)
        this.showBlank = true
    }

    select(item) {
        this.selected = item
    }
}

export default new ListDialogue()
