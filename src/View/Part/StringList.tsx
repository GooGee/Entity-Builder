import SelectStringButton from "../Button/SelectStringButton"

interface Property {
    itemzz: string[]
    source: string[]
    title?: string
    create(name: string): void
    delete(name: string): void
}

export default function StringList(property: Property) {
    return (
        <ul className="list-unstyled">
            <li className="mb-1">
                {property.title ? <h3 className="inline me-3">{property.title}</h3> : null}
                <SelectStringButton
                    className="wa"
                    isAdd
                    itemzz={property.source}
                    value=""
                    change={function (value) {
                        property.create(value)
                    }}
                ></SelectStringButton>
            </li>
            {property.itemzz.map((item) => (
                <li key={item} className="mb-1">
                    <button
                        className="btn btn-outline-danger"
                        type="button"
                        onClick={function () {
                            property.delete(item)
                        }}
                    >
                        - {item}
                    </button>
                </li>
            ))}
        </ul>
    )
}
