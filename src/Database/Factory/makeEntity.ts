import { OapiType } from "@/Model/Oapi"
import { OmitId } from "../dbhelper"
import { makeColumnCRUD, makeEntityCRUD, makeTypeFormatCRUD } from "../makeCRUD"
import { makeIntegerColumn } from "./makeColumn"
import makeSideBarItem from "./makeSideBarItem"
import makeTypeFormat from "./makeTypeFormat"

export default function makeEntity(
    name: string,
    description: string = "",
): OmitId<LB.Entity> {
    return {
        ...makeSideBarItem(name),
        description,
        table: "",
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
            makeColumnCRUD()
                .create(makeIntegerColumn(response.id, "id"))
                .then((item) => {
                    const data = makeTypeFormat(OapiType.integer)
                    data.ownerColumnId = item.id
                    return makeTypeFormatCRUD().create(data)
                }),
        )
}
