import Entity from '../states/entity'

export const CommonFieldMap = new Map([
    ['category_id', 'integer'],
    ['content', 'string'],
    ['email', 'string'],
    ['image', 'string'],
    ['link', 'string'],
    ['name', 'string'],
    ['parent_id', 'integer'],
    ['phone', 'string'],
    ['sort', 'integer'],
    ['status', 'integer'],
    ['text', 'string'],
    ['title', 'string'],
    ['type', 'integer'],
    ['url', 'string'],
])

export const SpecialFieldList = [
    new Entity.Field('id', 'increments'),
    new Entity.Field('user_id', 'integer'),
]

function exclude(field) {
    field.fillable = false
    field.included = false
}

function add() {
    const ExcludeIntegerList = ['id', 'user_id']
    ExcludeIntegerList.forEach(name => {
        const found = SpecialFieldList.find(field => field.name == name)
        if (found) {
            exclude(found)
        }
    })
    
    const password = new Entity.Field('password', 'char', '', false, 60)
    SpecialFieldList.push(password)
    password.fillable = false
    password.hidden = true

    const remember = new Entity.Field('remember_token', 'string', '', true, 60)
    SpecialFieldList.push(remember)
    exclude(remember)
    remember.allowNull = true
    remember.hidden = true

    const created = new Entity.Field('created_at', 'timestamp', '', true)
    SpecialFieldList.push(created)
    exclude(created)
    created.allowNull = true

    const updated = new Entity.Field('updated_at', 'timestamp', '', true)
    SpecialFieldList.push(updated)
    exclude(updated)
    updated.allowNull = true

    const deleted = new Entity.Field('deleted_at', 'timestamp', '', true)
    SpecialFieldList.push(deleted)
    exclude(deleted)
    deleted.allowNull = true
}

add()
