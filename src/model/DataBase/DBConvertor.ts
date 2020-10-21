import { IData, ITableMySQL, ITablePGSQL } from './IData'
import Entity from '../Schema/Entity'
import Field from '../Schema/Field'
import Project from '../Schema/Project'
import { PropertyManager } from '../Schema/Property'

const FieldSpecialKey = 'FieldSpecial'
const FieldTypeIntegerKey = 'FieldTypeInteger'

export default abstract class DBConvertor {
    readonly preset: Project
    readonly project: Project
    readonly fieldManager: PropertyManager
    readonly incrementManager: PropertyManager
    readonly fieldTypeIntegerManager: PropertyManager
    readonly fieldSpecialManager: PropertyManager | null = null
    readonly skip: boolean

    constructor(project: Project, preset: Project, skip: boolean) {
        this.preset = preset
        this.project = project
        this.skip = skip

        const FieldTypeKey = this.getPresetKeyOfFieldType()
        const fieldManager = preset.getPreset(FieldTypeKey)
        if (!fieldManager) {
            throw new Error(`Preset ${FieldTypeKey} not found`)
        }
        this.fieldManager = fieldManager.propertyManager

        const IncrementKey = this.getPresetKeyOfIncrementMap()
        const incrementManager = preset.getPreset(IncrementKey)
        if (!incrementManager) {
            throw new Error(`Preset ${IncrementKey} not found`)
        }
        this.incrementManager = incrementManager.propertyManager

        const fieldSpecialManager = preset.getPreset(FieldSpecialKey)
        if (fieldSpecialManager) {
            this.fieldSpecialManager = fieldSpecialManager.propertyManager
        }

        const fieldTypeIntegerManager = preset.getPreset(FieldTypeIntegerKey)
        if (!fieldTypeIntegerManager) {
            throw new Error(`Preset ${FieldTypeIntegerKey} not found`)
        }
        this.fieldTypeIntegerManager = fieldTypeIntegerManager.propertyManager
    }

    convert(data: IData) {
        data.tables.forEach(table => {
            if (!table.included) {
                return
            }
            const name = table.name.replace(data.prefix, '')
            if (name === 'migrations') {
                return
            }

            const entity = this.project.entityManager.make(name)
            const found = this.project.entityManager.find(entity.name)
            if (found) {
                if (this.skip) {
                    return
                }
                this.project.entityManager.remove(found)
            }
            this.project.entityManager.add(entity)

            this.convertTable(table, entity)
        })
    }

    getIncrement(name: string) {
        return this.incrementManager.find(name)
    }

    editSpecialField(field: Field) {
        if (this.fieldSpecialManager) {
            const found = this.fieldSpecialManager.find(field.name)
            if (found) {
                field.fillable = false
                field.included = false
            }
        }
    }

    isInteger(field: Field) {
        return this.fieldTypeIntegerManager.find(field.type) ? true : false
    }

    abstract getPresetKeyOfFieldType(): string
    abstract getPresetKeyOfIncrementMap(): string
    abstract convertTable(table: ITableMySQL | ITablePGSQL, entity: Entity): void
}
