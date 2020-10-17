import UniqueItem from '../Base/UniqueItem'
import UniqueList from '../Base/UniqueList'
import { PropertyManager } from './Property'
import Project from './Project'
import Entity from './Entity'
import { exeText } from '../Text'

export enum LayerEnum {
    Migration = 'Migration',
    Model = 'Model',
}

export default class Layer extends UniqueItem {
    original: boolean = false
    single: boolean = false
    description: string = ''
    classPattern: string = ''
    filePattern: string = ''
    nsPattern: string = ''
    path: string = ''
    script: string = ''
    template: string = ''
    readonly propertyManager = new PropertyManager()

    getClassName(project: Project, entity: Entity) {
        const data = {
            project,
            entity,
            layer: this,
        }
        return exeText(this.classPattern, data)
    }

    getFileName(project: Project, entity: Entity) {
        const data = {
            project,
            entity,
            layer: this,
        }
        return exeText(this.filePattern, data)
    }

    getNameSpace(project: Project, entity: Entity) {
        const data = {
            project,
            entity,
            layer: this,
        }
        return exeText(this.nsPattern, data)
    }
}

export class LayerManager extends UniqueList<Layer> {
    constructor() {
        super(Layer)
    }
}
