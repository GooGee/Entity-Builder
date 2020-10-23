import Project from '../Schema/Project'

const MinVersion = 12

export default class Loader {
    readonly project: Project

    constructor(project: Project) {
        this.project = project
    }

    load(source: Project) {
        if (!this.isProject(source)) {
            throw new Error('Unknown data!')
        }

        const version: number = source.version
        const message = `Cannot load version ${version} project!`
        if (version < MinVersion) {
            throw new Error(message)
        }
        if (version > this.project.version) {
            throw new Error(message)
        }

        source.version = this.project.version
        this.project.load(source)
    }

    private isProject(source: Project) {
        const keys = Object.keys(source)
        const mustContain = ['version', 'entityManager', 'layerManager', 'presetManager']
        return mustContain.every(key => keys.includes(key))
    }
}
