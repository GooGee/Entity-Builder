import UniqueItem from '../Base/UniqueItem'
import UniqueList from '../Base/UniqueList'

export default class Property extends UniqueItem {
    data = {}
    tag: string = ''
    value: string = ''
}

export class PropertyManager extends UniqueList<Property> {
    constructor() {
        super(Property)
    }
}
