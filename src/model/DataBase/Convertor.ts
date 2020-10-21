import { IData, DriverEnum } from './IData'
import MySQLConvertor from './MySQLConvertor'
import PGSQLConvertor from './PGSQLConvertor'
import Project from '../Schema/Project'

export default class Convertor {
    readonly preset: Project
    readonly project: Project
    readonly skip: boolean

    constructor(project: Project, preset: Project, skip: boolean = true) {
        const ppp = new Project(preset.name)
        ppp.load(preset)
        this.preset = ppp
        this.project = project
        this.skip = skip
    }

    convert(data: IData) {
        if (data.driver === DriverEnum.mysql) {
            const converter = new MySQLConvertor(this.project, this.preset, this.skip)
            converter.convert(data)
            return
        }
        if (data.driver === DriverEnum.pgsql) {
            const converter = new PGSQLConvertor(this.project, this.preset, this.skip)
            converter.convert(data)
            return
        }
        throw new Error(`Unsupported driver ${data.driver}`)
    }
}
