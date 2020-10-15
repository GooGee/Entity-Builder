import Item from './Item'
import List from './List'
import INewable from './INewable'

export default class ItemList<T extends Item> extends List<T> {
    readonly type: INewable<T>

    constructor(type: INewable<T>) {
        super()
        this.type = type
    }

    make() {
        return new this.type()
    }

    load(manager: ItemList<T>) {
        manager.list.forEach(item => {
            const iii = this.make()
            iii.load(item)
            this.list.push(iii)
        })
    }
}
