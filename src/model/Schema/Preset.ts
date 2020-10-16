import UniqueItem from '../Base/UniqueItem'
import UniqueList from '../Base/UniqueList'
import { PropertyManager } from './Property'

export default class Preset extends UniqueItem {
    original: boolean = false
    version: number = 1
    description: string = ''
    readonly propertyManager = new PropertyManager()
}

export class PresetManager extends UniqueList<Preset> {
    constructor() {
        super(Preset)
    }
}
