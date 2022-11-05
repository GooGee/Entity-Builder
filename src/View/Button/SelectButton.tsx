interface Property {
    className?: string
    itemzz: LB.IdNameItem[]
    isAdd?: boolean
    value: number
    verb?: string
    change(id: number, item?: LB.IdNameItem): void
}

export default function SelectButton(property: Property) {
    return (
        <select
            className={"form-select " + (property.className ?? "")}
            value={property.value}
            onChange={function (event) {
                const id = parseInt(event.target.value)
                property.change(
                    id,
                    property.itemzz.find((item) => item.id === id),
                )
            }}
        >
            <option disabled hidden value={0}>
                -- {property.verb ?? (property.isAdd ? "add" : "select")} --
            </option>
            {property.itemzz.map((item) => (
                <option key={item.id} value={item.id}>
                    {item.name}
                </option>
            ))}
        </select>
    )
}
