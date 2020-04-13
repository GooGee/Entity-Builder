import Entity from '../states/entity.js'
import { getPreset } from './request.js'
import { FakerMethodList, FakerPropertyList } from '../presets/seed.js'
import { RuleList, REList } from '../presets/rule.js'
import { RelationList } from '../presets/relation.js'
import { PHPTypeCastMap } from '../presets/phpcast.js'
import { FieldTypeList, CommonTypeList } from '../presets/fieldtype.js'

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
    loadFieldType(project)
    loadSeed(project)
    loadRule(project)
    loadRelation(project)
    loadPHPCast(project)
    getPreset().then(response => {
        const source = response.data
        project.ScriptManager.load(source.ScriptManager)
        project.TemplateManager.load(source.TemplateManager)
        project.LayerManager.load(source.LayerManager)
        project.EntityManager.load(source.EntityManager)
    })
}

function loadFieldType(project) {
    const typeManager = project.PresetManager.make('FieldType')
    project.PresetManager.add(typeManager)
    FieldTypeList.forEach(name => {
        const item = typeManager.DataManager.make(name)
        typeManager.DataManager.add(item)
    })

    const propertyManager = project.PresetManager.make('FieldTypeCommon')
    project.PresetManager.add(propertyManager)
    CommonTypeList.forEach(name => {
        const item = propertyManager.DataManager.make(name)
        propertyManager.DataManager.add(item)
    })
}

function loadSeed(project) {
    const methodManager = project.PresetManager.make('FakerMethod')
    project.PresetManager.add(methodManager)
    FakerMethodList.forEach(name => {
        const item = methodManager.DataManager.make(name)
        methodManager.DataManager.add(item)
    })

    const propertyManager = project.PresetManager.make('FakerProperty')
    project.PresetManager.add(propertyManager)
    FakerPropertyList.forEach(name => {
        const item = propertyManager.DataManager.make(name)
        propertyManager.DataManager.add(item)
    })
}

function loadRule(project) {
    const ruleManager = project.PresetManager.make('ValidationRule')
    project.PresetManager.add(ruleManager)
    RuleList.forEach(rule => {
        const item = ruleManager.DataManager.make(rule.name)
        item.tag = rule.tag
        ruleManager.DataManager.add(item)
    })

    const reManager = project.PresetManager.make('RegularExpression')
    project.PresetManager.add(reManager)
    REList.forEach(re => {
        const item = reManager.DataManager.make(re.name)
        item.value = re.text
        reManager.DataManager.add(item)
    })
}

function loadRelation(project) {
    const relationManager = project.PresetManager.make('RelationType')
    project.PresetManager.add(relationManager)
    RelationList.forEach(relation => {
        const item = relationManager.DataManager.make(relation)
        relationManager.DataManager.add(item)
    })
}

function loadPHPCast(project) {
    const castManager = project.PresetManager.make('CastPHP')
    project.PresetManager.add(castManager)
    PHPTypeCastMap.forEach((value, key) => {
        const item = castManager.DataManager.make(key)
        item.value = value
        castManager.DataManager.add(item)
    })
}
