import Entity from './Schema/Entity'
import Layer from './Schema/Layer'
import Project from './Schema/Project'

export interface JSParameter {
    entity: Entity
    layer: Layer
    project: Project
}
