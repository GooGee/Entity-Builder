import UniqueItem from '../Base/UniqueItem'
import UniqueList from '../Base/UniqueList'

export enum IndexTypeEnum {
    index = 'index',
    primary = 'primary',
    unique = 'unique',
}

export default class Index extends UniqueItem {
    type: IndexTypeEnum
    readonly fieldManager = new UniqueList(UniqueItem)

    constructor(name: string, type: IndexTypeEnum = IndexTypeEnum.index) {
        super(name)
        this.type = type
    }
}

export class IndexManager extends UniqueList<Index> {
    constructor() {
        super(Index)
    }

    get primaryIndex() {
        return this.list.find((index) => index.type === 'primary')
    }

    get uniqueIndexList() {
        return this.list.filter((index) => index.type === 'unique')
    }
}
