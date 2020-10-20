import UniqueItem from '../Base/UniqueItem'
import UniqueList from '../Base/UniqueList'
import { FieldManager } from './Field'
import { IndexManager } from './Index'
import { PresetManager } from './Preset'
import { RelationManager } from './Relation'

export default class Entity extends UniqueItem {
    description: string = ''
    tableName: string = ''
    readonly fieldManager = new FieldManager()
    readonly indexManager = new IndexManager()
    readonly dataManager = new PresetManager()
    readonly relationManager = new RelationManager()

    constructor(name: string) {
        super(name)
        this.name = this.camelCase
        this.tableName = this.snakeCase
    }

    getData(name: string) {
        return this.dataManager.find(name)
    }

    get primaryKey() {
        const field = this.fieldManager.incrementField
        if (field) {
            return field.name
        }

        const index = this.indexManager.primaryIndex
        if (index) {
            if (index.fieldManager.list.length == 1) {
                return index.fieldManager.list[0].name
            }
        }

        return ''
    }

    get hasTimeStamp() {
        const created_at = this.fieldManager.list.find(field => field.name === 'created_at')
        if (created_at) {
            const updated_at = this.fieldManager.list.find(field => field.name === 'updated_at')
            if (updated_at) {
                return true
            }
        }
        return false
    }
}

export class EntityManager extends UniqueList<Entity> {
    constructor() {
        super(Entity)
    }
}
