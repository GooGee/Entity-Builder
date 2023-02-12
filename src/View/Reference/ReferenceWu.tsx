import deleteTypeFormatArgument from "@/Service/deleteTypeFormatArgument"
import useWuzzStore from "@/Store/useWuzzStore"
import SelectButton from "../Button/SelectButton"
import ArgumentList from "./ArgumentList"
import createTypeFormatArgumentzz from "@/Factory/createTypeFormatArgumentzz"

interface Property {
    className?: string
    item: LB.TypeFormat
    wuId?: number
    update(item: LB.TypeFormat): Promise<any>
}

export default function ReferenceWu(property: Property) {
    const sWuzzStore = useWuzzStore()

    return (
        <div className={property.className}>
            <SelectButton
                className="wa inline"
                itemzz={sWuzzStore.itemzz}
                value={property.item.wuId}
                change={function (wuId) {
                    if (wuId === property.item.wuId) {
                        return
                    }

                    const old = property.item
                    property
                        .update({
                            ...property.item,
                            wuId,
                        })
                        .then(() => deleteTypeFormatArgument(old.id))
                        .then(function () {
                            return createTypeFormatArgumentzz(wuId, old.id)
                        })
                }}
            ></SelectButton>

            <ArgumentList item={property.item} wuId={property.wuId}></ArgumentList>
        </div>
    )
}
