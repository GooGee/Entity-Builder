import { Format, OapiType } from "@/Model/Oapi"
import getCollectionItemzz from "@/Service/getCollectionItemzz"
import { OmitId } from "../dbhelper"
import makeTypeFormat from "./makeTypeFormat"

export default function makeColumn(
    schemaId: number,
    name: string,
    type: string,
    value: string = "",
    length: number = 0,
): OmitId<LB.Column> {
    const cizz = getCollectionItemzz("DoctrineColumnType")
    const rozz = getCollectionItemzz("ReadOnlyColumn")
    function setTypeFormat(tf: LB.TypeFormat) {
        const formatzz: string[] = [Format.date, Format.time]
        if (formatzz.includes(type)) {
            tf.format = type
            return
        }
        if (type.includes(Format.date)) {
            tf.format = Format["date-time"]
            return
        }

        const found = cizz.find((item) => item.name === type)
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
            tf.type = tt
            return
        }
        if (type === "resource") {
            tf.format = Format.binary
            return
        }
        if (type === "array") {
            tf.isArray = true
            return
        }
    }

    const tf = makeTypeFormat()
    setTypeFormat(tf)
    return {
        schemaId,
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

export function makeIdColumn(schemaId: number) {
    return makeIntegerColumn(schemaId, "id")
}

export function makeIntegerColumn(schemaId: number, name: string, value: string = "") {
    return makeColumn(schemaId, name, "integer", value)
}

export function makeStringColumn(
    schemaId: number,
    name: string,
    value: string = "",
    length: number = 111,
) {
    return makeColumn(schemaId, name, "string", value, length)
}
