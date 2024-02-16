import makeColumn from "@/Database/Factory/makeColumn"
import makeTypeFormat from "@/Database/Factory/makeTypeFormat"
import { makeColumnCRUD, makeTypeFormatCRUD } from "@/Database/makeCRUD"
import getCollectionItemzz from "@/Service/getCollectionItemzz"
import useDoctrineColumnTypezzStore from "@/Store/useDoctrineColumnTypezzStore"

export default function createColumnTypeFormat(
    entityId: number,
    name: string,
    type: string,
    value: string = "",
    length: number = 0,
    style: string = "",
    comment: string = "",
    inTable = true,
): Promise<LB.Column> {
    const rozz = getCollectionItemzz("ReadOnlyColumn")
    const dct = useDoctrineColumnTypezzStore.getState().findByName(type)
    return makeColumnCRUD()
        .create(
            makeColumn(entityId, name, type, value, length, rozz, dct, style, comment, inTable),
        )
        .then((item) => {
            const tf = makeTypeFormat(
                dct?.oapiType as any,
                1,
                null,
                null,
                null,
                null,
                item.id,
                dct?.oapiFormat,
            )
            return makeTypeFormatCRUD().create(tf).then(() => item)
        })

}
