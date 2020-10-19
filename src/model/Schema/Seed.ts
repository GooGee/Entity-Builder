import Item from '../Base/Item'

export default class Seed extends Item {
    unique: boolean = false
    type: string = 'raw'
    value: string = ''
    parameter: string = ''
}
