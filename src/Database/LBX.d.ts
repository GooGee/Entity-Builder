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
        Entity: Entity[]
        Example: Example[]
        ExampleMap: ExampleMap[]
        File: File[]
        Index: Index[]
        IndexColumn: IndexColumn[]
        Module: Module[]
        ModuleAction: ModuleAction[]
        ModuleActionFile: ModuleActionFile[]
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
        Variable: Variable[]
        Wu: Wu[]
        WuChild: WuChild[]
        WuColumn: WuColumn[]
        WuColumnConstraint: WuColumnConstraint[]
        WuParameter: WuParameter[]
    }

    interface DataForScript {
        action: string
        db: DBData
        dependencyzz: string[]
        entity: Entity
        file: File
        fileMap: StringMap
        helper: any
        lodash: lodash
        ma?: ModuleAction
        module?: Module
        tree: DataForScriptTreeHelper
        treeMap: Map<number, LinkedTreeNode<Directory>>
    }

    interface DataForScriptTreeHelper {
        getClassName: (file: File, entity: Entity, action: string) => string
        getClassFullName: (file: File, entity: Entity, action: string) => string
        getDirectoryFullName: (
            directory: Directory,
            entity: Entity,
            action: string,
        ) => string
        getFileName: (file: LB.File, entity: LB.Entity, action: string) => string
        getFileFullName: (file: File, entity: Entity, action: string) => string
        getFullNameSpace: (
            directory: Directory,
            entity: Entity,
            action: string,
        ) => string
        getFullNameSpaceOfFile: (file: File, entity: Entity, action: string) => string
        makeNameSpacezz: (directory: LB.Directory, namezz: string[]) => string[]
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

    interface Finder<T extends IdItem> {
        find(id: number): T | undefined
        itemzz: T[]
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

    enum OapiType {
        any = "any",
        boolean = "boolean",
        integer = "integer",
        number = "number",
        string = "string",
        Enum = "Enum",
        TypeParameter = "TypeParameter",
        Wu = "Wu",
    }

    interface Setting {}

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

    interface TypeFormat {
        isArray: boolean
        nullable: boolean
        type: OapiType
        format: string
        targetId: number
        argumentzz: TypeFormat[]
    }
}
