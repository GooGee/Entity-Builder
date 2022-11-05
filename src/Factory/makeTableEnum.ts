export type TableEnum = Record<LB.TableKey, LB.TableKey>

export default function makeTableEnum(db: LB.DBData) {
    const keyzz = Object.keys(db.tables) as LB.TableKey[]
    return keyzz.reduce(function (old, value) {
        old[value] = value
        return old
    }, Object.create(null) as TableEnum)
}
