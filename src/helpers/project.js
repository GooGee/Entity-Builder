import Entity from '../states/entity.js'

export function convertDB(data, project, preset, skip) {
    const convertor = new Entity.Convertor(project, makePreset(preset), skip)
    convertor.convert(data)
    return project
}

export function loadProject(json, preset) {
    const project = makeProject(json.name)
    const loader = new Entity.Loader(project, makePreset(preset))
    loader.load(json)
    return project
}

export function loadPreset(project, preset) {
    project.scriptEntity = preset.scriptEntity
    project.scriptSetValidationRule = preset.scriptSetValidationRule
    project.PropertyManager.load(preset.PropertyManager)
    project.PresetManager.load(preset.PresetManager)
    project.ScriptManager.load(preset.ScriptManager)
    project.TemplateManager.load(preset.TemplateManager)
    project.LayerManager.load(preset.LayerManager)
    project.EntityManager.load(preset.EntityManager)
}

export function makePreset(data) {
    const project = makeProject('preset')
    loadPreset(project, data)
    return project
}

export function makeProject(name) {
    const project = new Entity.Project(name)
    return project
}
