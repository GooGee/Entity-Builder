import Project from './Schema/Project'
import SideBar from './SideBar'
import InputDialogue from './Dialogue/InputDialogue'
import ListDialogue from './Dialogue/ListDialogue'
import { render, run } from './Text'
import Layer from './Schema/Layer'
import Entity from './Schema/Entity'

export default class State {
    preset: Project | null = null
    project: Project | null = null
    sidebar: SideBar | null = null

    readonly inputDialogue = new InputDialogue()
    readonly listDialogue = new ListDialogue()

    private sidebarEntity: SideBar | null = null
    private sidebarLayer: SideBar | null = null
    private sidebarPreset: SideBar | null = null

    create() {
        this.project = new Project('Project')
        this.project.load(this.preset!)
        this.sidebarEntity = new SideBar(this.project.entityManager)
        this.sidebarLayer = new SideBar(this.project.layerManager)
        this.sidebarPreset = new SideBar(this.project.presetManager)
        this.showEntity()
    }

    showEntity() {
        this.sidebar = this.sidebarEntity
    }

    showLayer() {
        this.sidebar = this.sidebarLayer
    }

    showPreset() {
        this.sidebar = this.sidebarPreset
    }

    getEntity(name: string) {
        return this.project!.getEntity(name)
    }

    getLayer(name: string) {
        return this.project!.getLayer(name)
    }

    getPreset(name: string) {
        return this.project!.getPreset(name)
    }

    render(layer: Layer, entity: Entity) {
        const data = {
            project: this.project,
            layer,
            entity,
        }
        run(layer.script, data)
        return render(layer.template, data)
    }

    setValidation(entity: Entity) {
        const data = {
            project: this.project,
            entity,
        }
        run(this.project!.validationScript, data)
    }

    get loading() {
        return this.preset === null
    }

    get ready() {
        return this.project !== null
    }
}
