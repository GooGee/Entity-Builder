interface Property {
    item: LB.Column
}

export default function ColumnText(property: Property) {
    const textzz: string[] = []
    if (property.item.name === "id") {
        textzz.push("primary key")
    }
    if (property.item.nullable) {
        textzz.push("nullable")
    }
    if (property.item.unsigned) {
        textzz.push("unsigned")
    }
    if (property.item.length) {
        textzz.push("length: " + property.item.length)
    }
    if (property.item.scale) {
        textzz.push("scale: " + property.item.scale)
    }
    if (property.item.comment) {
        textzz.push(property.item.comment)
    }
    if (textzz.length === 0) {
        textzz.push("----")
    }
    return (
        <div className="pointer">
            {textzz.map((item) => (
                <div key={item}>{item}</div>
            ))}
        </div>
    )
}
