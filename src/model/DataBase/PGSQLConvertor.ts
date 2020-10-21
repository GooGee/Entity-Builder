import DBConvertor from './DBConvertor'
import { ITablePGSQL, IFieldPGSQL, IIndexPGSQL } from './IData'
import Entity from '../Schema/Entity'
import { IndexTypeEnum } from '../Schema/Index'
import { numberOrQuote } from '../Text'

export default class PGSQLConvertor extends DBConvertor {
    getPresetKeyOfFieldType() {
        return 'FieldTypePGSQL'
    }

    getPresetKeyOfIncrementMap() {
        return 'IncrementPGSQL'
    }

    convertTable(table: ITablePGSQL, entity: Entity) {
        table.fields.forEach(field => {
            const fff = this.convertField(field, entity)
            this.editSpecialField(fff)
        })

        this.convertIndex(table, entity)
    }

    convertField(field: IFieldPGSQL, entity: Entity) {
        const type = this.convertType(field)
        const fff = entity.fieldManager.make(field.column_name, type)
        entity.fieldManager.add(fff)

        if (field.is_nullable === 'YES') {
            fff.allowNull = true
        }

        if (field.column_default !== null) {
            if (field.column_default === 'CURRENT_TIMESTAMP') {
                fff.useCurrent = true
            } else {
                const value = field.column_default.replace(/::.+/, '')
                fff.value = numberOrQuote(value)
            }
        }

        if (field.character_maximum_length) {
            fff.length = field.character_maximum_length
        }
        if (field.numeric_scale) {
            fff.length = `${field.numeric_precision}, ${field.numeric_scale}`
        }
        return fff
    }

    convertIndex(table: ITablePGSQL, entity: Entity) {
        table.indexes.forEach(index => {
            const list = this.getIndexFieldNameList(index)

            if (index.indexname.includes('_pkey')) {
                this.addPrimary(list, entity)
                return
            }

            let type = IndexTypeEnum.index
            if (index.indexdef.includes('UNIQUE')) {
                type = IndexTypeEnum.unique
            }
            this.addIndex(type, list, entity)
        })
    }

    addPrimary(list: Array<string>, entity: Entity) {
        if (list.length === 1) {
            const field = entity.fieldManager.find(list[0])
            if (field) {
                field.type = 'increments'
                field.value = ''
                const increment = this.getIncrement(field.type)
                if (increment) {
                    field.type = increment.tag
                }
            }
            return
        }

        this.addIndex(IndexTypeEnum.primary, list, entity)
    }

    addIndex(type: IndexTypeEnum, list: Array<string>, entity: Entity) {
        const index = entity.indexManager.make(entity.indexManager.list.length)
        index.type = type
        list.forEach(name => {
            const field = index.fieldManager.make(name.replace(' ', ''))
            index.fieldManager.add(field)
        })

        entity.indexManager.add(index)
    }

    getIndexFieldNameList(index: IIndexPGSQL) {
        const found = index.indexdef.match(/\((.+)\)/)
        if (found) {
            return found[1].split(',')
        }

        throw new Error('Index Field not found')
    }

    convertType(field: IFieldPGSQL) {
        const type = this.fieldManager.find(field.data_type)
        if (type) {
            return type.tag
        }
        return 'binary'
    }
}
