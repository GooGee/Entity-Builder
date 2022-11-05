import { OmitId } from "../dbhelper"

export default function makeCollectionItem(
    collectionId: number,
    name: string,
    value: string = "",
    tag: string = "",
): OmitId<LB.CollectionItem> {
    return {
        collectionId,
        name,
        value,
        tag,
    }
}
