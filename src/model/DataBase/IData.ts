export enum DriverEnum {
    mysql = 'mysql',
    pgsql = 'pgsql',
}

export interface IData {
    driver: DriverEnum
    database: string
    prefix: string
    tables: Array<ITableMySQL | ITablePGSQL>
}

export interface ITable {
    included: boolean
    name: string
}

export interface ITableMySQL extends ITable {
    fields: Array<IFieldMySQL>
    indexes: Array<IIndexMySQL>
}

export interface IFieldMySQL {
    Field: string
    Default: string
    Extra: string
    Key: string
    Null: string
    Type: string
}

export interface IIndexMySQL {
    Column_name: string
    Key_name: string
    Non_unique: number
    Seq_in_index: number
    Table: string
}

export interface ITablePGSQL extends ITable {
    fields: Array<IFieldPGSQL>
    indexes: Array<IIndexPGSQL>
}

export interface IFieldPGSQL {
    character_maximum_length: number
    column_name: string
    column_default: string
    numeric_scale: number
    numeric_precision: number
    is_nullable: string
    data_type: string
}

export interface IIndexPGSQL {
    indexdef: string
    indexname: string
}
