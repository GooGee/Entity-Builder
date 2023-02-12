import makeTypeFormat from "@/Database/Factory/makeTypeFormat"
import { makeTypeFormatCRUD } from "@/Database/makeCRUD"
import { OapiType } from "@/Model/Oapi"
import useWuParameterzzStore from "@/Store/useWuParameterzzStore"

function createTypeFormatArgument(wp: LB.WuParameter, ownerId: number) {
    return makeTypeFormatCRUD().create(
        makeTypeFormat(
            wp.isWu ? OapiType.Wu : OapiType.any,
            1,
            null,
            null,
            ownerId,
            wp.id,
        ),
    )
}

export default async function createTypeFormatArgumentzz(
    wuId: number,
    ownerId: number,
) {
    const wpzz = useWuParameterzzStore
        .getState()
        .itemzz.filter((item) => item.wuId === wuId)
    if (wpzz.length === 0) {
        return []
    }

    const zz = []
    for (const item of wpzz) {
        const tf = await createTypeFormatArgument(item, ownerId)
        zz.push(tf)
    }
    return zz
}
