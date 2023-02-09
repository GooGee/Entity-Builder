import ColorEnum from "@/Model/ColorEnum"

const Version = 29

export default function migrateV029(db: LB.DBData, preset: LB.AppInfoData) {
    if (db.version === Version) {
        db.version = Version + 1
    } else {
        return
    }

    // @ts-ignore
    delete db.tables["Parameter"]

    db.tables.Column.forEach(function (column) {
        column.allowReserved = false
        column.color = ColorEnum.white
        column.deprecated = false
        column.description = ""
        column.example = column.example ?? ""
        column.explode = false
        column.required = column.required ?? true
        column.reserved = false
        column.style = column.style ?? ""
    })
}
