import ColorEnum from "@/Model/ColorEnum"
import { makeWuName } from "@/Service/makeName"
import { OmitId } from "../dbhelper"
import { makeTypeFormatCRUD, makeWuCRUD } from "../makeCRUD"
import makeSideBarItem from "./makeSideBarItem"
import makeTypeFormat from "./makeTypeFormat"

interface WuzzStore {
    findByName(name: string): LB.Wu | undefined
}

export function findOrMakeWu(
    name: string,
    entity: LB.Entity,
    isRequest: boolean,
    store: WuzzStore,
) {
    const found = store.findByName(name)
    if (found) {
        return Promise.resolve(found)
    }

    const wu = makeWu(name, entity.id, isRequest)
    wu.color = isRequest ? ColorEnum.pink : ColorEnum.orange
    return makeWuCRUD()
        .create(wu)
        .then((wu) => {
            const data = makeTypeFormat()
            data.ownerWuId = wu.id
            return makeTypeFormatCRUD()
                .create(data)
                .then(() => wu)
        })
}

export function makeActionWu(
    module: LB.Module,
    ma: LB.ModuleAction,
    entity: LB.Entity,
    isRequest: boolean,
    store: WuzzStore,
) {
    const name = makeWuName(module, ma, entity, isRequest)
    return findOrMakeWu(name, entity, isRequest, store)
}

export default function makeWu(
    name: string,
    entityId: number,
    isRequest: boolean = false,
): OmitId<LB.Wu> {
    return {
        ...makeSideBarItem(name),
        entityId,
        type: "allOf",
        isRequest,
        description: "",
        example: "",
        isMap: false,
        includeAll: false,
    }
}
