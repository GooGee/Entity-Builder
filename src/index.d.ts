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
        hidden: boolean
        ro: boolean
        wo: boolean
        cast: string
        fakeRaw: boolean
        fakeUnique: boolean
        fakeMethod: string
        fakeText: string
        // tf: TypeFormat
        // typeFormatId: number

        inTable: boolean
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

    interface DoctrineColumnType extends SideBarItem {
        fakeMethod: string
        fakeText: string
        oapiFormat: string
        oapiType: string
        phpType: string
    }

    interface Entity extends SideBarItem {
        isTable: boolean
        opened: boolean
        openedColumn: boolean
        name: string
        table: string
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
        isSingle: boolean
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
    }

    interface ModuleAction {
        id: number
        directoryId: number
        entityId: number
        filezz: ModuleActionFile[]
        moduleId: number
        deprecated: boolean
        name: string
        description: string
        summary: string
        routeName: string
        requestId: number
        responseWuId: number
        responseContentWuId: number
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
        method: string
        middlewarezz: string[]
        moduleActionId: number
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
        addToModel: boolean
    }

    interface Request extends Response {
        required: boolean
    }

    interface Response extends SideBarItem {
        description: string
        example: string
        mediaType: string
        // tf: TypeFormat
        // typeFormatId: number
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

    interface TypeFormat {
        id: number
        isArray: boolean
        nullable: boolean
        type: OapiType
        format: string
        // targetId: number
        // argumentzz: TypeFormat[]
        forWuParameterId: number | null
        ownerId: number | null
        variableId: number | null
        wuId: number
        wuParameterId: number | null
        ownerColumnId: number | null
        ownerRequestId: number | null
        ownerResponseId: number | null
        ownerWuId: number | null
        ownerWuChildId: number | null
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
        includeAll: boolean
        // typeFormatId: number
        // tf: TypeFormat
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

    interface WuParameter {
        id: number
        wuId: number
        name: string
        description: string
        isWu: boolean
    }
}
