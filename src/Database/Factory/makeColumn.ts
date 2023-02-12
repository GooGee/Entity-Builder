import { OapiType } from "@/Model/Oapi"
import getCollectionItemzz from "@/Service/getCollectionItemzz"
import { OmitId } from "../dbhelper"
import makeSideBarItem from "./makeSideBarItem"

export default function makeColumn(
    entityId: number,
    name: string,
    type: string,
    value: string = "",
    length: number = 0,
    rozz: LB.CollectionItem[] = [],
): OmitId<LB.Column> {
    return {
        ...makeSideBarItem(name),
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
        inTable: true,

        allowReserved: false,
        deprecated: false,
        description: "",
        example: "",
        explode: false,
        required: true,
        style: "",
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
    return makeColumn(entityId, name, type, value, length, rozz)
}

export function makeIntegerColumn(entityId: number, name: string, value: string = "") {
    return makeColumnTypeFormat(entityId, name, OapiType.integer, value)
}
