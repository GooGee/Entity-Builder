import Entity from '../states/entity.js'

export function loadProject(json) {
    const project = new Entity.Project(json.name)
    project.load(json)
    return project
}

export function makeProject(name, source) {
    const project = new Entity.Project(name)
    loadPreset(project, source)
    return project
}

function loadPreset(project, source) {
    project.PropertyManager.load(source.PropertyManager)
    project.PresetManager.load(source.PresetManager)
    project.ScriptManager.load(source.ScriptManager)
    project.TemplateManager.load(source.TemplateManager)
    project.LayerManager.load(source.LayerManager)
    project.EntityManager.load(source.EntityManager)
}
