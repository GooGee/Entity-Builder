declare namespace LB {
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

    interface Column {
        id: number
        schemaId: number
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
        constraintzz: ColumnConstraint[]
        inTable: boolean
        tf: TypeFormat
    }

    interface Directory {
        id: number
        opened: boolean
        parentId: number | null
        name: string
        description: string
    }

    interface Example extends SideBarItem {
        summary: string
        value: string
    }

    interface ExampleMap {
        id: number
        exampleId: number
        isRequest: boolean
        targetId: number
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
        schemaId: number
    }

    interface IndexColumn {
        id: number
        columnId: number
        indexId: number
        sort: number
    }

    interface Module extends SideBarItem {
        directoryId: number
        testDirectoryId: number
        prefix: string
    }

    interface ModuleAction {
        id: number
        directoryId: number
        testDirectoryId: number
        schemaId: number
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

    interface Parameter extends SideBarItem {
        allowEmptyValue: boolean
        allowReserved: boolean
        deprecated: boolean
        description: string
        example: string
        explode: boolean
        in: string
        name: string
        name2: string
        required: boolean
        tf: TypeFormat
        constraintzz: ColumnConstraint[]
    }

    interface ParameterMap {
        id: number
        inPath: boolean
        inResponse: boolean
        parameterId: number
        targetId: number
    }

    interface Path extends SideBarItem {
        moduleId: number
        schemaId: number
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
        schema0Id: number
        schema1Id: number
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

    interface Schema extends SideBarItem {
        opened: boolean
        openedColumn: boolean
        name: string
        description: string
        x: number
        y: number
    }

    interface Server extends SideBarItem {
        global: boolean
    }

    interface ServerMap {
        id: number
        serverId: number
        targetId: number
        forPath: boolean
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
        schemaId: number
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

    interface WuParameter {
        id: number
        wuId: number
        name: string
        description: string
    }

    interface AbstractSchema {
        id: number
    }

    interface ApiErrorResponse {
        detail?: string
        message: string
        errorzz: Record<string, string[]>
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

    interface ColumnConstraint {
        name: string
        parameter: string
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
        Directory: Directory[]
        Example: Example[]
        ExampleMap: ExampleMap[]
        File: File[]
        Index: Index[]
        IndexColumn: IndexColumn[]
        Module: Module[]
        ModuleAction: ModuleAction[]
        ModuleActionFile: ModuleActionFile[]
        ModuleActionResponse: ModuleActionResponse[]
        Parameter: Parameter[]
        ParameterMap: ParameterMap[]
        Path: Path[]
        PathMethod: PathMethod[]
        Relation: Relation[]
        Request: Request[]
        Response: Response[]
        Schema: Schema[]
        Server: Server[]
        ServerMap: ServerMap[]
        ServerVariable: ServerVariable[]
        Variable: Variable[]
        Wu: Wu[]
        WuChild: WuChild[]
        WuColumn: WuColumn[]
        WuParameter: WuParameter[]
    }

    interface DataForScript {
        action: string
        db: DBData
        dependencyzz: string[]
        file: File
        fileMap: StringMap
        helper: any
        lodash: lodash
        ma?: ModuleAction
        module?: Module
        schema: Schema
        tree: DataForScriptTreeHelper
        treeMap: Map<number, LinkedTreeNode<Directory>>
    }

    interface DataForScriptTreeHelper {
        getClassName: (file: File, schema: Schema, action: string) => string
        getClassFullName: (file: File, schema: Schema, action: string) => string
        getDirectoryFullName: (
            directory: Directory,
            schema: Schema,
            action: string,
        ) => string
        getFileName: (file: LB.File, schema: LB.Schema, action: string) => string
        getFileFullName: (file: File, schema: Schema, action: string) => string
        getFullNameSpace: (
            directory: Directory,
            schema: Schema,
            action: string,
        ) => string
        getFullNameSpaceOfFile: (file: File, schema: Schema, action: string) => string
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

    interface IdNameItem {
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

    interface SideBarItem extends WithId {
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

    interface WithId {
        id: number
    }
}
