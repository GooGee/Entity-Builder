import createColumnTypeFormat from "@/Factory/createColumnTypeFormat"
import { OapiType } from "@/Model/Oapi"
import { OmitId } from "../dbhelper"
import { makeEntityCRUD, makeTypeFormatCRUD } from "../makeCRUD"
import makeSideBarItem from "./makeSideBarItem"
import Constant from "@/Model/Constant"

export default function makeEntity(
    name: string,
    description: string = "",
    table: string = "",
): OmitId<LB.Entity> {
    return {
        ...makeSideBarItem(name),
        description,
        table,
        x: 222 + Math.floor(Math.random() * 111),
        y: 11,
        isTable: true,
        opened: true,
        openedColumn: true,
    }
}

export function makeEntityWithId(name: string) {
    return makeEntityCRUD()
        .create(makeEntity(name))
        .then((response) =>
            createColumnTypeFormat(response.id, Constant.Id, OapiType.integer)
        )
}
