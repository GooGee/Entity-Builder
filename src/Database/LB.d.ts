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
