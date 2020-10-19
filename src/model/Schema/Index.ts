import Item from '../Base/Item'
import ItemList from '../Base/ItemList'
import UniqueItem from '../Base/UniqueItem'
import UniqueList from '../Base/UniqueList'

export enum IndexTypeEnum {
    index = 'index',
    primary = 'primary',
    unique = 'unique',
}

export default class Index extends Item {
    type: IndexTypeEnum
    readonly fieldManager = new UniqueList(UniqueItem)

    constructor(type: IndexTypeEnum = IndexTypeEnum.index) {
        super()
        this.type = type
    }
}

export class IndexManager extends ItemList<Index> {
    constructor() {
        super(Index)
    }

    get primaryIndex() {
        return this.list.find(index => index.type == 'primary')
    }

    get uniqueIndexList() {
        return this.list.filter(index => index.type == 'unique')
    }
}
