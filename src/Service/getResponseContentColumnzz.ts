import { OapiType } from "@/Model/Oapi"
import getTypeFormatColumnzz from "./getTypeFormatColumnzz"

/**
 * return content Columnzz of Response (not wrapper)
 * @returns
 */
export default function getResponseContentColumnzz(responseId: number, db: LB.DBData) {
    const owner = db.tables.TypeFormat.find(
        (item) => item.ownerResponseId === responseId,
    )
    if (owner === undefined) {
        return []
    }

    const content = db.tables.TypeFormat.find(
        (item) => item.ownerId === owner.id && item.type === OapiType.Wu,
    )
    if (content === undefined) {
        return []
    }

    return getTypeFormatColumnzz(content, [], db)
}
