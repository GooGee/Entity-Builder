interface Property<T extends LB.IdNameItem> {
    className?: string
    itemzz: T[]
    isAdd?: boolean
    value: number
    verb?: string
    change(id: number, item?: T): void
}

export default function SelectButton<T extends LB.IdNameItem>(property: Property<T>) {
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
