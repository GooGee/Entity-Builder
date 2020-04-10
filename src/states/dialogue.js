export class Dialogue {
    constructor() {
        this.visible = false
        this.title = ''
        this.size = 'lg'
        this.callback = null
    }

    show(title = '', callback = null) {
        this.title = title
        this.callback = callback
        this.visible = true
    }

    hide() {
        this.visible = false
    }
}
