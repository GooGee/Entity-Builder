type ValueType = number | string

interface Property<T extends ValueType> {
    allowEmpty?: boolean
    className?: string
    isAdd?: boolean
    itemzz: Array<[T, string]>
    value: T
    verb?: string
    change(key: T): void
}

export default function SelectMapButton<T extends ValueType>(property: Property<T>) {
    return (
        <select
            className={"form-select " + (property.className ?? "")}
            value={property.value}
            onChange={function (event) {
                let value: ValueType = event.target.value
                if (typeof property.value === "number") {
                    value = parseInt(event.target.value)
                }
                property.change(value as T)
            }}
        >
            <option disabled={!property.allowEmpty} hidden={!property.allowEmpty} value="">
                -- {property.verb ?? (property.isAdd ? "add" : "select")} --
            </option>
            {property.itemzz.map((item) => (
                <option key={item[0]} value={item[0]}>
                    {item[1]}
                </option>
            ))}
        </select>
    )
}
