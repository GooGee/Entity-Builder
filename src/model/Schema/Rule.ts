import UniqueItem from '../Base/UniqueItem'
import UniqueList from '../Base/UniqueList'

export default class Rule extends UniqueItem {
    value: string = ''
}

export class RuleManager extends UniqueList<Rule> {
    constructor() {
        super(Rule)
    }
}
