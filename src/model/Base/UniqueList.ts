import ItemList from './ItemList'
import UniqueItem from './UniqueItem'
import INewable from './INewable'
import listener from '../Event/NameChangeListener'

export default class UniqueList<T extends UniqueItem> extends ItemList<T> {
    constructor(type: INewable<T>) {
        super(type)
        listener.onBeforeNameChange((sender: UniqueItem, name: string, old: string) => {
            if (this.list.includes(sender as any)) {
                this.throwIfExist(name)
            }
        })
    }

    throwIfExist(name: string) {
        if (this.find(name)) {
            throw new Error(`${this.type.name} ${name} already exists!`)
        }
    }

    add(item: T) {
        this.throwIfExist(item.name)
        super.add(item)
    }

    find(name: string) {
        return this.list.find(item => {
            return item.name === name
        })
    }

    make(...args: any[]) {
        const item = new this.type(...args)
        return item
    }

    load(manager: UniqueList<T>) {
        manager.list.forEach(item => {
            const iii = this.make(item.name)
            iii.load(item)
            this.add(iii)
        })
    }
}
