import UniqueItem from '../Base/UniqueItem'
import UniqueList from '../Base/UniqueList'
import Entity from './Entity'
import { LayerEnum } from './Layer'
import Project from './Project'

export default class Relation extends UniqueItem {
    type: string
    parameter: string = ''

    constructor(name: string, type: string = 'belongsTo') {
        super(name)
        this.type = type
    }
}

export class RelationManager extends UniqueList<Relation> {
    constructor() {
        super(Relation)
    }

    link(entity: Entity, project: Project) {
        const relation = this.make(entity.snakeCase)
        const model = project.layerManager.find(LayerEnum.Model)
        if (model) {
            const name = model.getClassName(entity)
            relation.parameter = `${name}::class`
            return relation
        }
        throw new Error('Model layer is missing!')
    }
}
