interface Property {
    item: LB.ColumnConstraint
    remove(item: LB.ColumnConstraint): void
    update(item: LB.ColumnConstraint): void
}

export default function Constraint(property: Property) {
    return (
        <tr>
            <td>
                <div className="btn-group">
                    <button
                        onClick={() => property.remove(property.item)}
                        className="btn btn-outline-primary danger"
                        type="button"
                    >
                        -
                    </button>
                    <button className="btn btn-outline-secondary" type="button">
                        {property.item.name}
                    </button>
                </div>
            </td>
            <td>
                <input
                    value={property.item.parameter}
                    onChange={(event) =>
                        property.update({
                            ...property.item,
                            parameter: event.target.value,
                        })
                    }
                    type="text"
                    className="form-control"
                />
            </td>
        </tr>
    )
}
