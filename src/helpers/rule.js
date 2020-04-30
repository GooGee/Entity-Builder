export default function(entity, project) {
    setUnique(entity)
    const FieldTypeInteger = project.PresetManager.find('FieldTypeInteger').DataManager
    const FieldTypeNumeric = project.PresetManager.find('FieldTypeNumeric').DataManager
    entity.FieldManager.list.forEach(field => setRule(field, FieldTypeInteger, FieldTypeNumeric))
}

function add(field, name, isBoolean = true) {
    const found = field.RuleManager.find(name)
    if (found) {
        return found
    }
    const rule = field.RuleManager.make(name, isBoolean)
    field.RuleManager.add(rule)
    return rule
}

function isString(field) {
    return field.type === 'char' || field.type === 'string'
}

function setRule(field, IntegerManager, NumericManager) {
    if (field.included) {
        // go on
    } else {
        return
    }

    if (field.isIncrement) {
        return
    }

    add(field, 'required')

    if (field.type === 'boolean') {
        add(field, 'boolean')
        return
    }
    if (IntegerManager.find(field.type)) {
        add(field, 'integer')
        return
    }
    if (NumericManager.find(field.type)) {
        add(field, 'numeric')
        return
    }
    if (isString(field)) {
        if (field.length) {
            const max = add(field, 'max', false)
            max.value = field.length
        }
    }
}

function setUnique(entity) {
    entity.IndexManager.uniqueIndexList.forEach(index => {
        if (index.FieldManager.list.length === 1) {
            const field = index.FieldManager.list[0]
            const found = entity.FieldManager.find(field.name)
            if (found) {
                const rule = add(found, 'unique', false)
                rule.value = entity.tableName
            }
        }
    })
}
