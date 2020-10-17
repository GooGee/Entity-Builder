import _ from 'lodash'
import Item from './Item'

export default class NameItem extends Item {
    protected _name: string
    protected static IgnoreList: Array<string> = Item.IgnoreList.concat(['_name'])
    protected static IncludeList: Array<string> = Item.IncludeList.concat(['name'])

    constructor(name: string) {
        super()
        this._name = name
    }

    get name() {
        return this._name
    }

    set name(name: string) {
        this._name = name
    }

    get camelCase() {
        return _.upperFirst(_.camelCase(this.name))
    }

    get snakeCase() {
        return _.snakeCase(this.name)
    }
}
