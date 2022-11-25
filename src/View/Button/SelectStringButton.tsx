import SelectMapButton from "./SelectMapButton"

interface Property {
    allowEmpty?: boolean
    className?: string
    isAdd?: boolean
    itemzz: string[]
    value: string
    verb?: string
    change(id: string): void
}

export default function SelectStringButton(property: Property) {
    return (
        <SelectMapButton
            allowEmpty={property.allowEmpty}
            className={property.className}
            isAdd={property.isAdd}
            itemzz={property.itemzz.map((item) => [item, item])}
            value={property.value}
            verb={property.verb}
            change={property.change}
        ></SelectMapButton>
    )
}
