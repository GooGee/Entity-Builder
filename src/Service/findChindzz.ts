interface TreeNode {
    id: number
    parentId: number | null
}

export default function findChindzz<T extends TreeNode>(nodezz: T[], id: number) {
    const map: Map<number, T[]> = new Map()
    nodezz.forEach((item) => {
        map.set(item.id, [])
    })

    nodezz.forEach((item) => {
        const found = map.get(item.parentId!)
        if (found) {
            found.push(item)
        }
    })

    const childzz: T[] = []
    dfs(map, id, childzz)
    return childzz
}

function dfs<T extends TreeNode>(map: Map<number, T[]>, id: number, childzz: T[]) {
    const found = map.get(id)
    if (found) {
        found.forEach((item) => {
            childzz.push(item)
            dfs(map, item.id, childzz)
        })
    }
}
