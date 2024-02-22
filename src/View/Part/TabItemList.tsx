import { ReactElement } from "react"

interface Property<T extends LB.IdNameItem> {
    children?: ReactElement
    className?: string
    empty?: boolean
    first?: ReactElement
    tab?: T
    tabzz: T[]
    setTab(tab: T): void
}

export default function TabItemList<T extends LB.IdNameItem>(property: Property<T>) {
    return (
        <ul className={"nav nav-tabs" + (property.empty ? " border-0" : " mb-3")}>
            {property.first}

            {property.tabzz.map((item) => (
                <li
                    key={item.id}
                    onClick={function () {
                        property.setTab(item)
                    }}
                    className="nav-item nav-item-fill"
                >
                    <span className={item.id === property.tab?.id ? "nav-link active" : "nav-link"}>{item.name}</span>
                </li>
            ))}

            {property.children}
        </ul>
    )
}
