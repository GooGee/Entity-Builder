import { colorzz, getBG, getBorder } from "@/Model/ColorEnum"

interface Property {
    className?: string
    color: string
    setColor: (color: string) => void
}

function ColorButtonGroup(property: Property) {
    return (
        <div className={"color-button-group " + (property.className ?? "")}>
            {colorzz.map((item) => (
                <span
                    className={
                        "color-button " + (item === property.color ? "active" : "")
                    }
                    key={item}
                    onClick={() => property.setColor(item)}
                    style={{
                        backgroundColor: getBG(item, property.color),
                        borderColor: getBorder(item),
                    }}
                ></span>
            ))}
        </div>
    )
}

export default ColorButtonGroup
