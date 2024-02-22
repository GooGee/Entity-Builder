interface Property {
    children?: JSX.Element
    item?: LB.IdNameItem
    itemzz: LB.IdNameItem[]
    select(item: LB.IdNameItem): void
}

export default function ListGroup(property: Property) {
    return (
        <div className="list-group">
            {property.children}

            {property.itemzz.map(function (one) {
                return (
                    <button
                        key={one.id}
                        className={
                            "list-group-item list-group-item-action" + (property.item?.id === one.id ? " active" : "")
                        }
                        onClick={() => property.select(one)}
                    >
                        {one.name}
                    </button>
                )
            })}
        </div>
    )
}
