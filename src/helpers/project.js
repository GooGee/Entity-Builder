import Entity from '../states/entity.js'
import { getPreset } from './request.js'

export function addUser(project) {
    const entity = project.EntityManager.make('user')
    project.EntityManager.add(entity)
    return entity
}

export function loadProject(json) {
    const project = new Entity.Project(json.name)
    project.load(json)
    return project
}

export function makeProject(name) {
    const project = new Entity.Project(name)
    loadPreset(project)
    return project
}

function loadPreset(project) {
    getPreset().then(response => {
        const source = response.data
        project.ScriptManager.load(source.ScriptManager)
        project.TemplateManager.load(source.TemplateManager)
        project.LayerManager.load(source.LayerManager)
        project.EntityManager.load(source.EntityManager)
    })
}
