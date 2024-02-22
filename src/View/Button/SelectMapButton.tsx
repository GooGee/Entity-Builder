interface Property {
    allowEmpty?: boolean
    className?: string
    isAdd?: boolean
    itemzz: Array<[string, string]>
    value: string
    verb?: string
    change(key: string): void
}

export default function SelectMapButton(property: Property) {
    return (
        <select
            className={"form-select " + (property.className ?? "")}
            value={property.value}
            onChange={function (event) {
                property.change(event.target.value)
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
