interface Property {
    className?: string
    itemzz: string[]
    isAdd?: boolean
    value: string
    verb?: string
    change(id: string): void
}

export default function SelectStringButton(property: Property) {
    return (
        <select
            className={"form-select " + (property.className ?? "")}
            value={property.value}
            onChange={function (event) {
                property.change(event.target.value)
            }}
        >
            <option disabled hidden value="">
                -- {property.verb ?? (property.isAdd ? "add" : "select")} --
            </option>
            {property.itemzz.map((item) => (
                <option key={item} value={item}>
                    {item}
                </option>
            ))}
        </select>
    )
}
