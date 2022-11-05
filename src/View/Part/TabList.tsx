interface Property {
    tab: string
    tabzz: string[]
    setTab(tab: string): void
}

export default function TabList(property: Property) {
    return (
        <ul className="nav nav-tabs mb-3">
            {property.tabzz.map((item) => (
                <li
                    key={item}
                    onClick={function () {
                        property.setTab(item)
                    }}
                    className="nav-item nav-item-fill"
                >
                    <span
                        className={
                            item === property.tab ? "nav-link active" : "nav-link"
                        }
                    >
                        {item}
                    </span>
                </li>
            ))}
        </ul>
    )
}
