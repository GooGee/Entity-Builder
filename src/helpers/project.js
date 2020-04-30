import Entity from '../states/entity.js'

export function loadProject(json, preset) {
    const project = new Entity.Project(json.name)
    const loader = new Entity.Loader(project, makeProject('preset', preset))
    loader.load(json)
    return project
}

export function makeProject(name, source) {
    const project = new Entity.Project(name)
    loadPreset(project, source)
    return project
}

export function convertDB(data, preset) {
    const project = makeProject(data.database, preset)
    const convertor = new Entity.Convertor(project, makeProject('preset', preset))
    convertor.convert(data)
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
