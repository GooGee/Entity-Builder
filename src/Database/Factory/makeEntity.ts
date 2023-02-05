import { OmitId } from "../dbhelper"
import { makeColumnCRUD, makeEntityCRUD } from "../makeCRUD"
import { makeIdColumn } from "./makeColumn"
import makeSideBarItem from "./makeSideBarItem"

export default function makeEntity(
    name: string,
    description: string = "",
): OmitId<LB.Entity> {
    return {
        ...makeSideBarItem(name),
        description,
        x: 222 + Math.floor(Math.random() * 111),
        y: 11,
        opened: true,
        openedColumn: true,
    }
}

export function makeEntityWithId(name: string) {
    return makeEntityCRUD()
        .create(makeEntity(name))
        .then((response) => makeColumnCRUD().create(makeIdColumn(response.id)))
}
