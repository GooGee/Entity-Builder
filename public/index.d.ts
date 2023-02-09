namespace LB {
    interface Collection extends SideBarItem {
        id: number
        name: string
        description: string
        valueDescription: string
        tagDescription: string
    }

    interface CollectionItem {
        id: number
        collectionId: number
        name: string
        value: string
        tag: string
    }

    interface Column extends SideBarItem {
        id: number
        entityId: number
        name: string
        type: string
        length: number
        default: string
        scale: number
        unsigned: boolean
        nullable: boolean
        comment: string
        fillable: boolean
        ro: boolean
        wo: boolean
        cast: string
        fakeRaw: boolean
        fakeUnique: boolean
        fakeMethod: string
        fakeText: string
        inTable: boolean
        tf: TypeFormat

        // Parameter
        allowReserved: boolean
        deprecated: boolean
        description: string
        example: string
        explode: boolean
        required: boolean
        style: string
    }

    interface ColumnConstraint {
        id: number
        columnId: number
        name: string
        parameter: string
    }

    interface Directory {
        id: number
        opened: boolean
        parentId: number | null
        name: string
        description: string
    }

    interface Entity extends SideBarItem {
        isTable: boolean
        opened: boolean
        openedColumn: boolean
        name: string
        description: string
        x: number
        y: number
    }

    interface Example extends SideBarItem {
        summary: string
        value: string
    }

    interface ExampleMap {
        id: number
        exampleId: number
        requestId: number | null
        responseId: number | null
    }

    interface File {
        id: number
        directoryId: number
        name: string
        color: string
        layer: string
        description: string
        fileNamePattern: string
        nameSpacePattern: string
    }

    interface Index {
        id: number
        type: string
        entityId: number
    }

    interface IndexColumn {
        id: number
        columnId: number
        indexId: number
        sort: number
    }

    interface Module extends SideBarItem {
        directoryId: number
        fileId: number
        testDirectoryId: number
        prefix: string
    }

    interface ModuleAction {
        id: number
        directoryId: number
        testDirectoryId: number
        entityId: number
        moduleId: number
        collectionItemId: number
        deprecated: boolean
        description: string
        summary: string
        operationId: string
        requestId: number
    }

    interface ModuleActionFile {
        id: number
        moduleActionId: number
        fileId: number
        directoryId: number
    }

    interface ModuleActionResponse {
        id: number
        description: string
        moduleActionId: number
        responseId: number
        status: string
    }

    interface ParameterMap {
        id: number
        alias: string
        columnId: number
        pathId: number | null
        requestId: number | null
        responseId: number | null
    }

    interface Path extends SideBarItem {
        moduleId: number
        entityId: number
        name: string
        description: string
        summary: string
    }

    interface PathMethod {
        id: number
        method: string
        middlewarezz: string[]
        pathId: number
        moduleActionId: number
    }

    interface Relation {
        id: number
        type: string
        name0: string
        name1: string
        entity0Id: number
        entity1Id: number
        column1Id: number
    }

    interface Request extends Response {
        required: boolean
    }

    interface Response extends SideBarItem {
        description: string
        example: string
        mediaType: string
        tf: TypeFormat
    }

    interface Server extends SideBarItem {
        global: boolean
    }

    interface ServerMap {
        id: number
        pathId: number | null
        requestId: number | null
        serverId: number
    }

    interface ServerVariable {
        id: number
        serverId: number
        variableId: number
    }

    interface Variable extends SideBarItem {
        default: string
        enum: string[]
        type: string
    }

    interface Wu extends SideBarItem {
        entityId: number
        name: string
        type: string
        isRequest: boolean
        description: string
        example: string
        isMap: boolean
        tf: TypeFormat
    }

    interface WuChild {
        id: number
        wuId: number
        tf: TypeFormat
    }

    interface WuColumn {
        id: number
        wuId: number
        columnId: number
        alias: string
    }

    interface WuColumnConstraint {
        id: number
        columnConstraintId: number
        wuColumnId: number
    }

    // TypeParameter
    interface WuParameter {
        id: number
        wuId: number
        name: string
        description: string
        isWu: boolean
    }
}
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
