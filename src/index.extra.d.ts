namespace LB {
    interface ApiErrorResponse {
        message: string
        errors: Record<string, string[]>
    }

    interface ApiResponse<T> {
        status: number
        message: string
        data: T
    }

    interface AppInfo {
        version: string
        data: string | null
        composer: string
    }

    interface AppInfoData {
        db: DBData
        oapi: OpenAPIObject
        setting: Setting
    }

    interface ColumnWithAlias extends Column {
        alias: string
        wuColumnId: number
    }

    interface Composer {
        autoload: {
            "psr-4": StringMap
        }
        "autoload-dev": {
            "psr-4": StringMap
        }
    }

    interface DBData {
        name: string
        tables: DBTable
        version: number
    }

    interface DBCountResult {
        amount: number
    }

    interface DBTable {
        Collection: Collection[]
        CollectionItem: CollectionItem[]
        Column: Column[]
        ColumnConstraint: ColumnConstraint[]
        Directory: Directory[]
        DoctrineColumnType: DoctrineColumnType[]
        Entity: Entity[]
        Example: Example[]
        ExampleMap: ExampleMap[]
        File: File[]
        Index: Index[]
        IndexColumn: IndexColumn[]
        Module: Module[]
        ModuleAction: ModuleAction[]
        ModuleActionResponse: ModuleActionResponse[]
        ParameterMap: ParameterMap[]
        Path: Path[]
        PathMethod: PathMethod[]
        Relation: Relation[]
        Request: Request[]
        Response: Response[]
        Server: Server[]
        ServerMap: ServerMap[]
        ServerVariable: ServerVariable[]
        TypeFormat: TypeFormat[]
        Variable: Variable[]
        Wu: Wu[]
        WuColumn: WuColumn[]
        WuColumnConstraint: WuColumnConstraint[]
        WuParameter: WuParameter[]
    }

    interface DataForScript {
        action: string
        DataMap: Record<string, any>
        db: DBData
        dependencyzz: string[]
        entity: IdNameItem
        file: File
        fileMap: StringMap
        helper: any
        getResponseContentColumnzz(responseId: number, db: DBData): ColumnWithAlias[]
        getTypeFormatColumnzz(
            tf: TypeFormat,
            argumentzz: TypeFormatWithArgumentzz[],
            db: DBData,
        ): ColumnWithAlias[]
        lodash: lodash
        makeChildzzMap: <T extends IdItem>(
            itemzz: T[],
            column: keyof T,
            map?: Map<number, T[]>,
        ) => Map<number, T[]>
        makeIdItemMap: <T extends IdItem>(
            itemzz: T[],
            map?: Map<number, T>,
        ) => Map<number, T>
        makeIdNameMap: (
            itemzz: IdNameItem[],
            map?: Map<number, string>,
        ) => Map<number, string>
        ma?: ModuleAction
        module?: Module
        tree: DataForScriptTreeHelper
        treeMap: Map<number, LinkedTreeNode<Directory>>
    }

    interface DataForScriptTreeHelper {
        getClassName: (file: File, entity: IdNameItem, action: string) => string
        getClassFullName: (file: File, entity: IdNameItem, action: string) => string
        getDirectoryFullName: (
            directory: Directory,
            entity: IdNameItem,
            action: string,
        ) => string
        getFileName: (file: File, entity: IdNameItem, action: string) => string
        getFileFullName: (file: File, entity: IdNameItem, action: string) => string
        getFullNameSpace: (
            directory: Directory,
            entity: IdNameItem,
            action: string,
        ) => string
        getFullNameSpaceOfFile: (file: File, entity: IdNameItem, action: string) => string
        makeNameSpacezz: (directory: Directory, namezz: string[]) => string[]
        replacePSR4: (name: string) => void
    }

    interface DoctrineColumn {
        name: string
        type: string
        default: string | null
        comment: string
        length: number
        scale: number
        nullable: boolean
        unsigned: boolean
    }

    interface DoctrineIndex {
        columnzz: string[]
        type: string
    }

    interface DoctrineRelation {
        columnzz: string[]
        schema: string
    }

    interface DoctrineSchema {
        name: string
        tablezz: DoctrineTable[]
    }

    interface DoctrineTable {
        name: string
        comment: string
        columnzz: DoctrineColumn[]
        included?: boolean
        indexzz: DoctrineIndex[]
        relationzz: DoctrineRelation[]
    }

    interface IdItem {
        id: number
    }

    interface IdNameItem extends IdItem {
        id: number
        name: string
    }

    interface LinkedTreeNode<T> {
        childzz: LinkedTreeNode<T>[]
        parent?: LinkedTreeNode<T>
    }

    interface Migration {
        batch: number
        migration: string
    }

    interface MigrationStatus {
        dbexist: boolean
        filezz: string[]
        migrationzz: Migration[]
    }

    interface ModuleActionFile extends File {
        isExtra: boolean
    }

    enum OapiType {
        any = "any",
        boolean = "boolean",
        integer = "integer",
        number = "number",
        string = "string",
        Enum = "Enum",
        WuParameter = "WuParameter",
        Wu = "Wu",
    }

    interface Setting {
        note: string
    }

    interface SideBarItem extends IdNameItem {
        id: number
        name: string
        color: string
        description: string
        reserved: boolean
    }

    type StringMap = Record<string, string>

    type TableKey = keyof DBTable
    type TableEnum = Record<TableKey, TableKey>
}
