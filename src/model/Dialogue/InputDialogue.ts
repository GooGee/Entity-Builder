import Dialogue from './Dialogue'

export default class InputDialogue extends Dialogue {
    text: string = ''

    showText(title: string, text: string, callback: CallableFunction, size: string = 'xl') {
        this.title = title
        this.text = text
        this.callback = callback
        this.size = size
        super.show(title, callback)
    }
}
