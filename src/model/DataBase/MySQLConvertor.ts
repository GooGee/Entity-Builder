import DBConvertor from './DBConvertor'
import { ITableMySQL, IFieldMySQL, IIndexMySQL } from './IData'
import Entity from '../Schema/Entity'
import { IndexTypeEnum } from '../Schema/Index'
import { numberOrQuote } from '../Text'

export default class MySQLConvertor extends DBConvertor {
    getPresetKeyOfFieldType() {
        return 'FieldTypeMySQL'
    }

    getPresetKeyOfIncrementMap() {
        return 'IncrementMySQL'
    }

    convertTable(table: ITableMySQL, entity: Entity) {
        table.fields.forEach(field => {
            const fff = this.convertField(field, entity)
            this.editSpecialField(fff)
        })

        this.convertIndex(table, entity)
    }

    convertField(field: IFieldMySQL, entity: Entity) {
        const type = this.convertType(field)
        const fff = entity.fieldManager.make(field.Field, type)
        entity.fieldManager.add(fff)

        if (field.Null === 'YES') {
            fff.allowNull = true
        }

        if (field.Default !== null) {
            if (field.Default === 'CURRENT_TIMESTAMP') {
                fff.useCurrent = true
            } else {
                fff.value = numberOrQuote(field.Default)
            }
        }

        let isIncrement = false
        if (field.Key === 'PRI' && field.Extra === 'auto_increment') {
            isIncrement = true
            fff.type = 'increments'
            const name = this.getTypeName(field.Type)
            const increment = this.getIncrement(name)
            if (increment) {
                fff.type = increment.tag
            }
        }

        if (this.isInteger(fff)) {
            // no length for Integer
        } else {
            const found = field.Type.match(/\(([\d,]+)\)/)
            if (found) {
                fff.length = found[1]
            }
        }

        if (field.Type.includes('unsigned')) {
            if (isIncrement === false) {
                fff.unsigned = true
            }
        }
        return fff
    }

    convertIndex(table: ITableMySQL, entity: Entity) {
        const indexMap: Map<string, Array<IIndexMySQL>> = new Map()
        table.indexes.forEach(index => {
            let iii = indexMap.get(index.Key_name)
            if (iii) {
                iii.push(index)
            } else {
                iii = [index]
            }
            indexMap.set(index.Key_name, iii)
        })

        indexMap.forEach((list, key) => {
            this.addIndex(key, list, entity)
        })
    }

    addIndex(name: string, list: Array<IIndexMySQL>, entity: Entity) {
        if (name === 'PRIMARY') {
            if (entity.fieldManager.hasIncrement) {
                return
            }
        }

        const index = entity.indexManager.make(entity.indexManager.list.length)
        entity.indexManager.add(index)

        let isUnique = false
        list.forEach(field => {
            if (field.Non_unique === 0) {
                isUnique = true
            }
            const fff = index.fieldManager.make(field.Column_name)
            index.fieldManager.add(fff)
        })

        if (name === 'PRIMARY') {
            index.type = IndexTypeEnum.primary
            return
        }
        if (isUnique) {
            index.type = IndexTypeEnum.unique
        }
    }

    getTypeName(name: string) {
        const found = name.match(/^([a-zA-Z]+)/)
        if (found) {
            return found[1]
        }
        throw new Error(`Unknown type ${name}`)
    }

    convertType(field: IFieldMySQL) {
        const name = this.getTypeName(field.Type)
        const type = this.fieldManager.find(name)
        if (type) {
            return type.tag
        }
        return 'binary'
    }
}
