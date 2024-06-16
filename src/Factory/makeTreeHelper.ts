import parseTemplate, { DataType } from "@/Service/Generator/parseTemplate"
import { LinkedTreeNode } from "./makeLinkedTreeMap"

export default function makeTreeHelper(
    treeMap: Map<number, LinkedTreeNode<LB.Directory>>,
    psr4: LB.StringMap,
) {
    function getClassName(file: LB.File, entity: LB.IdNameItem, action: string) {
        return getFileName(file, entity, action).slice(0, -4)
    }

    function getClassFullName(file: LB.File, entity: LB.IdNameItem, action: string) {
        const data = { file, entity, action } as DataType
        const namezz = [file.fileNamePattern]
        if (file.nameSpacePattern) {
            namezz.push(file.nameSpacePattern)
        }
        const parent = treeMap.get(file.directoryId)
        if (parent) {
            makeNameSpacezz(parent, namezz)
        }
        const text = namezz.reverse().join("/")
        return parseTemplate(text, data).replaceAll("/", "\\").slice(0, -4)
    }

    function getDirectoryFullName(
        directory: LB.Directory,
        entity: LB.IdNameItem,
        action: string,
    ) {
        const data = { entity, action } as DataType
        data.directory = directory
        const namezz = makeNameSpacezz(directory, [])
        const text = namezz.reverse().join("/")
        return replacePSR4(parseTemplate(text, data))
    }

    function getFileName(file: LB.File, entity: LB.IdNameItem, action: string) {
        return parseTemplate(file.fileNamePattern, { entity, action })
    }

    function getFileFullName(file: LB.File, entity: LB.IdNameItem, action: string) {
        const data = { file, entity, action } as DataType
        const namezz = [file.fileNamePattern]
        if (file.nameSpacePattern) {
            namezz.push(file.nameSpacePattern)
        }
        const parent = treeMap.get(file.directoryId)
        if (parent) {
            makeNameSpacezz(parent, namezz)
        }
        const text = namezz.reverse().join("/")
        return replacePSR4(parseTemplate(text, data))
    }

    function getFullNameSpace(
        directory: LB.Directory,
        entity: LB.IdNameItem,
        action: string,
    ) {
        const data = { entity, action } as DataType
        data.directory = directory
        const namezz = makeNameSpacezz(directory, [])
        const text = namezz.reverse().join("/")
        return parseTemplate(text, data).replaceAll("/", "\\")
    }

    function getFullNameSpaceOfFile(file: LB.File, entity: LB.IdNameItem, action: string) {
        const text = getClassFullName(file, entity, action)
        return text.slice(0, text.lastIndexOf("\\"))
    }

    function makeNameSpacezz(directory: LB.Directory, namezz: string[]) {
        makeTrack(directory, []).forEach((item) => namezz.push(item.name))
        return namezz
    }

    function makeTrack(
        directory: LB.Directory,
        nodezz: LinkedTreeNode<LB.Directory>[],
    ) {
        let node = treeMap.get(directory.id)
        while (node) {
            if (node.parentId === null) {
                break
            }
            nodezz.push(node)
            node = node.parent
        }
        return nodezz
    }

    /**
     * psr4 must end with \
     * e.g.
     * App\
     * App\A\
     *
     * invalid:
     * App\A
     * App\AA
     */
    function replacePSR4(path: string) {
        let target = ""
        const keyzz = Object.keys(psr4) as (keyof LB.StringMap)[]
        keyzz.forEach((key) => {
            if (path.startsWith(key.replaceAll("\\", "/"))) {
                if (key.length > target.length) {
                    target = key
                }
            }
        })

        if (target.length) {
            return psr4[target] + path.slice(target.length)
        }
        return path
    }

    return {
        getClassName,
        getClassFullName,
        getDirectoryFullName,
        getFileName,
        getFileFullName,
        getFullNameSpace,
        getFullNameSpaceOfFile,
        makeNameSpacezz,
        replacePSR4,
    }
}
