interface Property {
    tab?: LB.IdNameItem
    tabzz: LB.IdNameItem[]
    setTab(tab: LB.IdNameItem): void
}

export default function TabItemList(property: Property) {
    const id = property.tab?.id ?? 0
    return (
        <ul className="nav nav-tabs mb-3">
            {property.tabzz.map((item) => (
                <li
                    key={item.id}
                    onClick={function () {
                        property.setTab(item)
                    }}
                    className="nav-item nav-item-fill"
                >
                    <span className={item.id === id ? "nav-link active" : "nav-link"}>
                        {item.name}
                    </span>
                </li>
            ))}
        </ul>
    )
}
