import UniqueItem from '../Base/UniqueItem'
import UniqueList from '../Base/UniqueList'
import Entity from './Entity'
import { PresetManager } from './Preset'
import Project from './Project'
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
    readonly dataManager = new PresetManager()

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

    getFullName(project: Project, entity: Entity) {
        return this.getNameSpace(project, entity) + '\\' + this.getClassName(project, entity)
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
