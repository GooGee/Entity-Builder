import UniqueItem from '../Base/UniqueItem'
import UniqueList from '../Base/UniqueList'
import { RuleManager } from './Rule'
import Seed from './Seed'
import listener from '../Event/ItemDeleteListener'

export default class Field extends UniqueItem {
    allowNull: boolean = false
    cast: string = ''
    collation: string = ''
    comment: string = ''
    fillable: boolean = true
    hidden: boolean = false
    included: boolean = true
    length: number | string = ''
    type: string
    useCurrent: boolean = false
    unsigned: boolean = false
    value: number | string = ''

    readonly ruleManager = new RuleManager()
    readonly seed = new Seed()

    constructor(name: string, type: string = 'integer') {
        super(name)
        this.type = type
    }

    get isIncrement() {
        return this.type.includes('ncrement')
    }
}

export class FieldManager extends UniqueList<Field> {
    constructor() {
        super(Field)
    }

    make(name: string, type: string) {
        const field = new Field(name, type)
        return field
    }

    remove(item: Field) {
        listener.emitBeforeFieldDelete(this, item)
        super.remove(item)
        listener.emitAfterFieldDelete(this, item)
    }

    get hasIncrement() {
        if (this.incrementField) {
            return true
        }
        return false
    }

    get incrementField() {
        return this.list.find(field => field.isIncrement)
    }
}
