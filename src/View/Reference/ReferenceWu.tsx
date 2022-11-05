import useWuzzStore from "@/Store/useWuzzStore"
import SelectButton from "../Button/SelectButton"
import TypeFormatList from "./TypeFormatList"

interface Property {
    className?: string
    item: LB.TypeFormat
    wuId?: number
    update(item: LB.TypeFormat): void
}

export default function ReferenceWu(property: Property) {
    const sWuzzStore = useWuzzStore()

    return (
        <div className={property.className}>
            <SelectButton
                className="wa inline"
                itemzz={sWuzzStore.itemzz}
                value={property.item.targetId}
                change={function (targetId) {
                    property.update({
                        ...property.item,
                        targetId,
                    })
                }}
            ></SelectButton>

            <TypeFormatList
                itemzz={property.item.argumentzz}
                targetId={property.item.targetId}
                wuId={property.wuId}
                updateArgumentzz={function (argumentzz) {
                    property.update({
                        ...property.item,
                        argumentzz,
                    })
                }}
            ></TypeFormatList>
        </div>
    )
}
