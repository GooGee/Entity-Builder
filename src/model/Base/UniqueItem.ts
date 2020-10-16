import listener from '../Event/NameChangeListener'
import NameItem from './NameItem'

export default class UniqueItem extends NameItem {
    get name() {
        return this._name
    }

    set name(name: string) {
        if (this.name === name) {
            return
        }

        const old = this.name
        listener.emitBeforeNameChange(this, name, old)
        this._name = name
        listener.emitAfterNameChange(this, name, old)
        return
    }
}
