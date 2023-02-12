import { makeTypeFormatCRUD } from "@/Database/makeCRUD"

export default function deleteTypeFormatArgument(ownerId: number) {
    return makeTypeFormatCRUD()
        .deleteChildzz(ownerId, "ownerId")
        .then((item) => console.log("delete argument ", item))
}
