const Carbon = '\\Illuminate\\Support\\Carbon'

export const PHPTypeCastMap = new Map([
    ['array', 'array'],
    ['boolean', 'boolean'],
    ['collection', '\\Illuminate\\Support\\Collection'],
    ['date', Carbon],
    ['datetime', Carbon],
    ['decimal:8', 'double'],
    ['double', 'double'],
    ['float', 'float'],
    ['integer', 'integer'],
    ['object', 'object'],
    ['string', 'string'],
    ['timestamp', 'integer'],
])
