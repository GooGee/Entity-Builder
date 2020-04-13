class Rule {
    constructor(name) {
        this.name = name
        this.tag = ''
    }
}

export const RuleList = [
    new Rule('accepted'),
    new Rule('active_url'),
    new Rule('after', false),
    new Rule('after_or_equal', false),
    new Rule('alpha'),
    new Rule('alpha_dash'),
    new Rule('alpha_num'),
    new Rule('array'),
    new Rule('bail'),
    new Rule('before', false),
    new Rule('before_or_equal', false),
    new Rule('between', false),
    new Rule('boolean'),
    new Rule('confirmed'),
    new Rule('date'),
    new Rule('date_equals', false),
    new Rule('date_format', false),
    new Rule('different', false),
    new Rule('digits', false),
    new Rule('digits_between', false),
    new Rule('dimensions'),
    new Rule('distinct'),
    new Rule('email'),
    new Rule('ends_with', false),
    new Rule('exists', false),
    new Rule('file'),
    new Rule('filled'),
    new Rule('gt', false),
    new Rule('gte', false),
    new Rule('image'),
    new Rule('in', false),
    new Rule('in_array', false),
    new Rule('integer'),
    new Rule('ip'),
    new Rule('ipv4'),
    new Rule('ipv6'),
    new Rule('json'),
    new Rule('lt', false),
    new Rule('lte', false),
    new Rule('max', false),
    new Rule('mimetypes', false),
    new Rule('mimes', false),
    new Rule('min', false),
    new Rule('not_in', false),
    new Rule('not_regex', false),
    new Rule('nullable'),
    new Rule('numeric'),
    new Rule('present'),
    new Rule('regex', false),
    new Rule('required'),
    new Rule('required_if', false),
    new Rule('required_unless', false),
    new Rule('required_with', false),
    new Rule('required_with_all', false),
    new Rule('required_without', false),
    new Rule('required_without_all', false),
    new Rule('same', false),
    new Rule('size', false),
    new Rule('sometimes'),
    new Rule('starts_with', false),
    new Rule('string'),
    new Rule('timezone'),
    new Rule('unique', false),
    new Rule('url'),
    new Rule('uuid'),
]

RuleList.find(rule => rule.name === 'alpha').tag = 'Content'
RuleList.find(rule => rule.name === 'alpha_dash').tag = 'Content'
RuleList.find(rule => rule.name === 'alpha_num').tag = 'Content'
RuleList.find(rule => rule.name === 'distinct').tag = 'Content'
RuleList.find(rule => rule.name === 'ends_with').tag = 'Content'
RuleList.find(rule => rule.name === 'starts_with').tag = 'Content'
RuleList.find(rule => rule.name === 'in').tag = 'Content'
RuleList.find(rule => rule.name === 'not_in').tag = 'Content'
RuleList.find(rule => rule.name === 'not_regex').tag = 'Content'
RuleList.find(rule => rule.name === 'regex').tag = 'Content'

RuleList.find(rule => rule.name === 'after').tag = 'Date'
RuleList.find(rule => rule.name === 'after_or_equal').tag = 'Date'
RuleList.find(rule => rule.name === 'before').tag = 'Date'
RuleList.find(rule => rule.name === 'before_or_equal').tag = 'Date'
RuleList.find(rule => rule.name === 'date').tag = 'Date'
RuleList.find(rule => rule.name === 'date_equals').tag = 'Date'
RuleList.find(rule => rule.name === 'date_format').tag = 'Date'
RuleList.find(rule => rule.name === 'timezone').tag = 'Date'

RuleList.find(rule => rule.name === 'confirmed').tag = 'Field'
RuleList.find(rule => rule.name === 'different').tag = 'Field'
RuleList.find(rule => rule.name === 'gt').tag = 'Field'
RuleList.find(rule => rule.name === 'gte').tag = 'Field'
RuleList.find(rule => rule.name === 'lt').tag = 'Field'
RuleList.find(rule => rule.name === 'lte').tag = 'Field'
RuleList.find(rule => rule.name === 'in_array').tag = 'Field'
RuleList.find(rule => rule.name === 'same').tag = 'Field'

RuleList.find(rule => rule.name === 'dimensions').tag = 'File'
RuleList.find(rule => rule.name === 'file').tag = 'File'
RuleList.find(rule => rule.name === 'image').tag = 'File'
RuleList.find(rule => rule.name === 'mimetypes').tag = 'File'
RuleList.find(rule => rule.name === 'mimes').tag = 'File'

RuleList.find(rule => rule.name === 'bail').tag = 'Other'
RuleList.find(rule => rule.name === 'exists').tag = 'Other'
RuleList.find(rule => rule.name === 'unique').tag = 'Other'
RuleList.find(rule => rule.name === 'filled').tag = 'Other'
RuleList.find(rule => rule.name === 'present').tag = 'Other'
RuleList.find(rule => rule.name === 'required').tag = 'Other'
RuleList.find(rule => rule.name === 'sometimes').tag = 'Other'

RuleList.find(rule => rule.name === 'required_if').tag = 'Require'
RuleList.find(rule => rule.name === 'required_unless').tag = 'Require'
RuleList.find(rule => rule.name === 'required_with').tag = 'Require'
RuleList.find(rule => rule.name === 'required_with_all').tag = 'Require'
RuleList.find(rule => rule.name === 'required_without').tag = 'Require'
RuleList.find(rule => rule.name === 'required_without_all').tag = 'Require'

RuleList.find(rule => rule.name === 'between').tag = 'Size'
RuleList.find(rule => rule.name === 'digits').tag = 'Size'
RuleList.find(rule => rule.name === 'digits_between').tag = 'Size'
RuleList.find(rule => rule.name === 'max').tag = 'Size'
RuleList.find(rule => rule.name === 'min').tag = 'Size'
RuleList.find(rule => rule.name === 'size').tag = 'Size'

RuleList.find(rule => rule.name === 'array').tag = 'Type'
RuleList.find(rule => rule.name === 'boolean').tag = 'Type'
RuleList.find(rule => rule.name === 'integer').tag = 'Type'
RuleList.find(rule => rule.name === 'nullable').tag = 'Type'
RuleList.find(rule => rule.name === 'numeric').tag = 'Type'
RuleList.find(rule => rule.name === 'string').tag = 'Type'

RuleList.find(rule => rule.name === 'accepted').tag = 'WWW'
RuleList.find(rule => rule.name === 'active_url').tag = 'WWW'
RuleList.find(rule => rule.name === 'email').tag = 'WWW'
RuleList.find(rule => rule.name === 'ip').tag = 'WWW'
RuleList.find(rule => rule.name === 'ipv4').tag = 'WWW'
RuleList.find(rule => rule.name === 'ipv6').tag = 'WWW'
RuleList.find(rule => rule.name === 'json').tag = 'WWW'
RuleList.find(rule => rule.name === 'url').tag = 'WWW'
RuleList.find(rule => rule.name === 'uuid').tag = 'WWW'

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
