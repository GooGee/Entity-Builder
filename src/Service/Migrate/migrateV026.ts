const Version = 26

interface DataType extends LB.Column {
    constraintzz: LB.ColumnConstraint[]
}

export default function migrateV026(db: LB.DBData, preset: LB.AppInfoData) {
    if (db.version === Version) {
        db.version = Version + 1
    } else {
        return
    }

    db.tables.ColumnConstraint = []
    let index = 1
    // @ts-ignore
    db.tables.Column.forEach((column: DataType) => {
        column.constraintzz.forEach((item) => {
            db.tables.ColumnConstraint.push({
                id: index,
                columnId: column.id,
                name: item.name,
                parameter: item.parameter,
            })
            index += 1
        })
        column.constraintzz = []
    })
}
