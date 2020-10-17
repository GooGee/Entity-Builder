export default class Dialogue {
    size: string = 'lg'
    title: string = ''
    visible: boolean = false
    callback: CallableFunction | null = null

    show(title = '', callback: CallableFunction | null = null) {
        this.title = title
        this.callback = callback
        this.visible = true
    }

    hide() {
        this.visible = false
    }
}
