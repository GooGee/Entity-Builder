import ColorEnum from "@/Model/ColorEnum"
import { OmitId } from "../dbhelper"
import { makeWuCRUD } from "../makeCRUD"
import makeSideBarItem from "./makeSideBarItem"
import makeTypeFormat from "./makeTypeFormat"

interface WuzzStore {
    findByName(name: string): LB.Wu | undefined
}

export function makeActionWu(
    action: string,
    schema: LB.Schema,
    isRequest: boolean,
    store: WuzzStore,
) {
    const name = makeWuName(action, schema, isRequest)

    const found = store.findByName(name)
    if (found) {
        return Promise.resolve(found)
    }

    const wu = makeWu(name, schema.id, isRequest)
    wu.color = isRequest ? ColorEnum.pink : ColorEnum.orange
    return makeWuCRUD().create(wu)
}

export default function makeWu(
    name: string,
    schemaId: number,
    isRequest: boolean = false,
): OmitId<LB.Wu> {
    return {
        ...makeSideBarItem(name),
        schemaId,
        type: "allOf",
        isRequest,
        description: "",
        example: "",
        isMap: false,
        tf: makeTypeFormat(),
    }
}

export function makeWuName(action: string, schema: LB.Schema, isRequest: boolean) {
    return `${schema.name}_${action}_` + (isRequest ? "Form" : "DTO")
}
