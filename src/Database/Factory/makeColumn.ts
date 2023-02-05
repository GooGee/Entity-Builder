import { Format, OapiType } from "@/Model/Oapi"
import getCollectionItemzz from "@/Service/getCollectionItemzz"
import { OmitId } from "../dbhelper"
import makeTypeFormat from "./makeTypeFormat"

export default function makeColumn(
    entityId: number,
    name: string,
    type: string,
    value: string = "",
    length: number = 0,
    rozz: LB.CollectionItem[] = [],
): OmitId<LB.Column> {
    const tf = makeTypeFormat()
    return {
        entityId,
        name,
        type,
        length,
        scale: 0,
        default: value,
        comment: "",
        unsigned: false,
        nullable: false,
        cast: "",
        fillable: false,
        ro: rozz.findIndex((item) => item.name === name) >= 0,
        wo: false,
        fakeRaw: true,
        fakeUnique: false,
        fakeMethod: "",
        fakeText: "",
        constraintzz: [],
        inTable: true,
        tf,
    }
}

export function makeColumnTypeFormat(
    entityId: number,
    name: string,
    type: string,
    value: string = "",
    length: number = 0,
) {
    const rozz = getCollectionItemzz("ReadOnlyColumn")
    const column = makeColumn(entityId, name, type, value, length, rozz)
    setColumnTypeFormat(column)
    return column
}

export function makeIdColumn(entityId: number) {
    return makeIntegerColumn(entityId, "id")
}

export function makeIntegerColumn(entityId: number, name: string, value: string = "") {
    return makeColumnTypeFormat(entityId, name, OapiType.integer, value)
}

export function setColumnTypeFormat(
    column: OmitId<LB.Column>,
    cizz = getCollectionItemzz("DoctrineColumnType"),
) {
    const formatzz: string[] = [Format.date, Format.time]
    if (formatzz.includes(column.type)) {
        column.tf.format = column.type
        return
    }
    if (column.type.includes(Format.date)) {
        column.tf.format = Format["date-time"]
        return
    }

    const found = cizz.find((item) => item.name === column.type)
    if (found === undefined) {
        return
    }

    const map: Map<string, OapiType> = new Map([
        ["bool", OapiType.boolean],
        ["float", OapiType.number],
        ["int", OapiType.integer],
        ["string", OapiType.string],
    ])
    const tt = map.get(found.tag)
    if (tt) {
        column.tf.type = tt
        return
    }
    if (column.type === "resource") {
        column.tf.format = Format.binary
        return
    }
    if (column.type === "array") {
        column.tf.isArray = true
        return
    }
}
