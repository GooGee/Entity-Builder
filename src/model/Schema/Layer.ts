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
    pathPattern: string = ''
    script: string = ''
    template: string = ''
    readonly dataManager = new PresetManager()

    getClassName(entity: Entity) {
        const data = {
            entity,
            layer: this,
        }
        return exeText(this.classPattern, data)
    }

    getData(name: string) {
        return this.dataManager.find(name)
    }

    getFileName(entity: Entity) {
        const data = {
            entity,
            layer: this,
        }
        return exeText(this.filePattern, data)
    }

    getFullName(project: Project, entity: Entity) {
        return this.getNameSpace(project, entity) + '\\' + this.getClassName(entity)
    }

    getFullPath(project: Project, entity: Entity) {
        return this.getPath(project, entity) + '/' + this.getFileName(entity)
    }

    getNameSpace(project: Project, entity: Entity) {
        const data = {
            project,
            entity,
            layer: this,
        }
        const text = this.nsPattern.split('\\').join('/')
        return exeText(text, data)
            .split('/')
            .join('\\')
    }

    getPath(project: Project, entity: Entity) {
        const data = {
            project,
            entity,
            layer: this,
        }
        return exeText(this.pathPattern, data)
    }
}

export class LayerManager extends UniqueList<Layer> {
    constructor() {
        super(Layer)
    }
}
