import Entity from '../states/entity'

export const RuleList = Entity.RuleList

export function check(entity) {
    setUnique(entity)
    entity.FieldManager.list.forEach(field => setRule(field))
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

function setRule(field) {
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
    if (field.isInteger) {
        add(field, 'integer')
        return
    }
    if (field.isNumber) {
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

export const REList = [
    {
        name: 'A-Z',
        text: '/^[A-Z]+$/',
    },
    {
        name: 'a-z',
        text: '/^[a-z]+$/',
    },
    {
        name: '0-9',
        text: '/^\\d+$/',
    },
    {
        name: 'A-Z a-z',
        text: '/^[A-Za-z]+$/',
    },
    {
        name: 'A-Z a-z 0-9',
        text: '/^[A-Za-z0-9]+$/',
    },
    {
        name: 'A-Z a-z 0-9 _',
        text: '/^[A-Z_a-z][A-Z_a-z0-9]+$/',
    },
]

export const KindList = [
    {
        title: 'Content',
        list: [
            // RuleList.find(rule => rule.name === 'alpha'),
            // RuleList.find(rule => rule.name === 'alpha_dash'),
            // RuleList.find(rule => rule.name === 'alpha_num'),
            RuleList.find(rule => rule.name === 'distinct'),
            RuleList.find(rule => rule.name === 'ends_with'),
            RuleList.find(rule => rule.name === 'starts_with'),
            RuleList.find(rule => rule.name === 'in'),
            RuleList.find(rule => rule.name === 'not_in'),
            RuleList.find(rule => rule.name === 'not_regex'),
            RuleList.find(rule => rule.name === 'regex'),
        ],
    },
    {
        title: 'Date',
        list: [
            RuleList.find(rule => rule.name === 'after'),
            RuleList.find(rule => rule.name === 'after_or_equal'),
            RuleList.find(rule => rule.name === 'before'),
            RuleList.find(rule => rule.name === 'before_or_equal'),
            RuleList.find(rule => rule.name === 'date'),
            RuleList.find(rule => rule.name === 'date_equals'),
            RuleList.find(rule => rule.name === 'date_format'),
            RuleList.find(rule => rule.name === 'timezone'),
        ],
    },
    {
        title: 'Field',
        list: [
            RuleList.find(rule => rule.name === 'confirmed'),
            RuleList.find(rule => rule.name === 'different'),
            RuleList.find(rule => rule.name === 'gt'),
            RuleList.find(rule => rule.name === 'gte'),
            RuleList.find(rule => rule.name === 'lt'),
            RuleList.find(rule => rule.name === 'lte'),
            RuleList.find(rule => rule.name === 'in_array'),
            RuleList.find(rule => rule.name === 'same'),
        ],
    },
    {
        title: 'File',
        list: [
            RuleList.find(rule => rule.name === 'dimensions'),
            RuleList.find(rule => rule.name === 'file'),
            RuleList.find(rule => rule.name === 'image'),
            RuleList.find(rule => rule.name === 'mimetypes'),
            RuleList.find(rule => rule.name === 'mimes'),
        ],
    },
    {
        title: 'Other',
        list: [
            RuleList.find(rule => rule.name === 'bail'),
            RuleList.find(rule => rule.name === 'exists'),
            RuleList.find(rule => rule.name === 'unique'),
            RuleList.find(rule => rule.name === 'filled'),
            RuleList.find(rule => rule.name === 'present'),
            RuleList.find(rule => rule.name === 'required'),
            RuleList.find(rule => rule.name === 'sometimes'),
        ],
    },
    {
        title: 'Require',
        list: [
            RuleList.find(rule => rule.name === 'required_if'),
            RuleList.find(rule => rule.name === 'required_unless'),
            RuleList.find(rule => rule.name === 'required_with'),
            RuleList.find(rule => rule.name === 'required_with_all'),
            RuleList.find(rule => rule.name === 'required_without'),
            RuleList.find(rule => rule.name === 'required_without_all'),
        ],
    },
    {
        title: 'Size',
        list: [
            RuleList.find(rule => rule.name === 'between'),
            RuleList.find(rule => rule.name === 'digits'),
            RuleList.find(rule => rule.name === 'digits_between'),
            RuleList.find(rule => rule.name === 'max'),
            RuleList.find(rule => rule.name === 'min'),
            RuleList.find(rule => rule.name === 'size'),
        ],
    },
    {
        title: 'Type',
        list: [
            RuleList.find(rule => rule.name === 'array'),
            RuleList.find(rule => rule.name === 'boolean'),
            RuleList.find(rule => rule.name === 'integer'),
            RuleList.find(rule => rule.name === 'nullable'),
            RuleList.find(rule => rule.name === 'numeric'),
            RuleList.find(rule => rule.name === 'string'),
        ],
    },
    {
        title: 'WWW',
        list: [
            RuleList.find(rule => rule.name === 'accepted'),
            RuleList.find(rule => rule.name === 'active_url'),
            RuleList.find(rule => rule.name === 'email'),
            RuleList.find(rule => rule.name === 'ip'),
            RuleList.find(rule => rule.name === 'ipv4'),
            RuleList.find(rule => rule.name === 'ipv6'),
            RuleList.find(rule => rule.name === 'json'),
            RuleList.find(rule => rule.name === 'url'),
            RuleList.find(rule => rule.name === 'uuid'),
        ],
    },
]
