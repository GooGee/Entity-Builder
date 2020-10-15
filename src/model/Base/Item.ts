import IKeyValue from './IKeyValue'
import ItemList from './ItemList'

export default class Item {
    // ignore the Vue Observer
    protected static IgnoreList: Array<string> = ['__ob__']
    protected static IncludeList: Array<string> = []

    mustIgnore(name: string) {
        return Object.getPrototypeOf(this).constructor.IgnoreList.includes(name)
    }

    get includeList(): Array<string> {
        return Object.getPrototypeOf(this).constructor.IncludeList
    }

    load(source: Item) {
        const names = Object.getOwnPropertyNames(source)
        names.forEach(name => {
            this.loadProperty(name, source)
        })
    }

    protected loadProperty(name: string, source: IKeyValue) {
        if (this.mustIgnore(name)) {
            return
        }

        const descriptor = this.getDescriptor(name)
        if (descriptor) {
            if (descriptor.writable) {
                // ok
            } else if (descriptor.get && descriptor.set) {
                // ok
            } else {
                return
            }

            const me: IKeyValue = this
            if (me[name] instanceof Item) {
                const item: Item = me[name]
                item.load(source[name])
            } else if (me[name] instanceof ItemList) {
                const item: ItemList<Item> = me[name]
                item.load(source[name])
            } else {
                // TypeError: 0 is read-only
                // Object.assign(me[name], source[name])
                me[name] = source[name]
            }
        }
    }

    protected getDescriptor(name: string) {
        let descriptor = null
        let item: IKeyValue = this
        while (item) {
            descriptor = Object.getOwnPropertyDescriptor(item, name)
            if (descriptor) {
                return descriptor
            }
            item = Object.getPrototypeOf(item)
        }
        return descriptor
    }

    toJSON(key: string) {
        const me = this as IKeyValue
        const names = Object.getOwnPropertyNames(me)
        const result: IKeyValue = {}
        names.forEach(name => {
            if (this.mustIgnore(name)) {
                return
            }
            result[name] = me[name]
        })
        this.includeList.forEach(name => {
            result[name] = me[name]
        })
        return result
    }
}
