import { OmitId } from "../dbhelper"
import makeSideBarItem from "./makeSideBarItem"

export default function makeColumn(
    entityId: number,
    name: string,
    type: string,
    value: string = "",
    length: number = 0,
    rozz: LB.CollectionItem[] = [],
    dct?: LB.DoctrineColumnType,
    style: string = "",
    comment: string = "",
): OmitId<LB.Column> {
    return {
        ...makeSideBarItem(name),
        entityId,
        name,
        type,
        length,
        scale: 0,
        default: value,
        comment,
        unsigned: false,
        nullable: false,

        cast: "",
        fillable: false,
        hidden: false,
        ro: rozz.findIndex((item) => item.name === name) > -1,
        wo: false,
        fakeRaw: true,
        fakeUnique: false,
        fakeMethod: dct?.fakeMethod ?? "",
        fakeText: dct?.fakeText ?? "",

        inTable: true,
        allowReserved: false,
        deprecated: false,
        description: "",
        example: "",
        explode: false,
        required: true,
        style,

        raField: dct?.raField ?? "TextField",
        raInput: dct?.raInput ?? "TextField",
    }
}
