const ApiDirectory = 12
const TestApiDirectory = 81
const Version = 1

export default function migrateV001(db: LB.DBData) {
    if (db.version === Version) {
        db.version = Version + 1
    } else {
        return
    }

    db.tables.Column.forEach((item) => {
        item.ro = false
        item.wo = false
    })

    const module = db.tables.Collection.find((item) => item.name === "Module")
    if (module === undefined) {
        throw new Error("Collection Module not found")
    }
    const cizz = db.tables.CollectionItem.filter(
        (item) => item.collectionId === module.id,
    )
    const moduleId = cizz.length === 0 ? 1 : cizz[0].id
    const map: Map<number, number> = new Map()
    db.tables.ModuleAction.forEach((item) => {
        item.moduleId = moduleId
        item.testDirectoryId = TestApiDirectory
        map.set(item.id, item.directoryId)
    })
    db.tables.ModuleActionFile.forEach((item) => {
        item.directoryId = map.get(item.moduleActionId) ?? ApiDirectory
    })
}
