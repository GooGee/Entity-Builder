interface TreeNode {
    id: number
    parentId: number
    childzz?: this[]
}

export default function makeTreeMap<T extends TreeNode>(nodezz: T[]) {
    const map: Map<number, T> = new Map()
    nodezz.forEach((item) => {
        item.childzz = []
        map.set(item.id, item)
    })

    nodezz.forEach((item) => {
        const found = map.get(item.parentId)
        if (found) {
            found.childzz!.push(item)
        }
    })

    return map
}
