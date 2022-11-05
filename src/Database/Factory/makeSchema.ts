import { OmitId } from "../dbhelper"
import { makeColumnCRUD, makeSchemaCRUD } from "../makeCRUD"
import { makeIdColumn } from "./makeColumn"
import makeSideBarItem from "./makeSideBarItem"

export default function makeSchema(
    name: string,
    description: string = "",
): OmitId<LB.Schema> {
    return {
        ...makeSideBarItem(name),
        description,
        x: 222 + Math.floor(Math.random() * 111),
        y: 11,
        opened: true,
        openedColumn: true,
    }
}

export function makeSchemaWithId(name: string) {
    return makeSchemaCRUD()
        .create(makeSchema(name))
        .then((response) => makeColumnCRUD().create(makeIdColumn(response.id)))
}
