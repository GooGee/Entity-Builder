import { colorzz, getBG, getBorder } from "@/Model/ColorEnum"

interface Property {
    className?: string
    color: string
    setColor: (color: string) => void
}

export default function ColorButtonDropdown(property: Property) {
    return (
        <div className={"hover-trigger " + (property.className ?? "")}>
            <div>
                <span
                    className="color-button active"
                    style={{
                        backgroundColor: getBG(property.color, property.color),
                        borderColor: getBorder(property.color),
                    }}
                ></span>
            </div>
            <div className="hover-list">
                {colorzz.map((item) => (
                    <div key={item}>
                        <span
                            className={"color-button " + (item === property.color ? "active" : "")}
                            onClick={() => property.setColor(item)}
                            style={{
                                backgroundColor: getBG(item, property.color),
                                borderColor: getBorder(item),
                            }}
                        ></span>
                    </div>
                ))}
            </div>
        </div>
    )
}
