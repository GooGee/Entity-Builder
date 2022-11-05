interface TreeNode {
    id: number
    parentId: number | null
}

export type LinkedTreeNode<T extends {}> = T & {
    childzz: LinkedTreeNode<T>[]
    parent?: LinkedTreeNode<T>
}

export default function makeLinkedTreeMap<T extends TreeNode>(nodezz: T[]) {
    const map: Map<number, LinkedTreeNode<T>> = new Map()
    nodezz.forEach((item) => map.set(item.id, { ...item, childzz: [] }))

    nodezz.forEach((item) => {
        const found = map.get(item.parentId!)
        if (found) {
            const child = map.get(item.id)!
            child.parent = found
            found.childzz.push(child)
        }
    })

    return map
}
