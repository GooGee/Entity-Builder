import useVariablezzStore from "@/Store/useVariablezzStore"
import SelectButton from "../Button/SelectButton"

interface Property {
    item: LB.TypeFormat
    update(item: LB.TypeFormat): void
}

export default function ReferenceEnum(property: Property) {
    const sVariablezzStore = useVariablezzStore()

    return (
        <SelectButton
            className="wa inline"
            itemzz={sVariablezzStore.itemzz}
            value={property.item.variableId ?? 0}
            change={function (variableId) {
                property.update({
                    ...property.item,
                    variableId,
                })
            }}
        ></SelectButton>
    )
}
