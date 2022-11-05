import MediaType from "./MediaType"

interface Property {
    item: LB.Request
    update(item: LB.Request): void
}

export default function RequestDetail(property: Property) {
    return (
        <MediaType item={property.item} isRequest={true} update={property.update}>
            <tr>
                <td>required</td>
                <td>
                    <div className="form-check form-switch">
                        <input
                            checked={property.item.required}
                            onChange={(event) =>
                                property.update({
                                    ...property.item,
                                    required: event.target.checked,
                                })
                            }
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id={"requiredSwitchCheck" + property.item.id}
                        />
                        <label
                            className="form-check-label"
                            htmlFor={"requiredSwitchCheck" + property.item.id}
                        ></label>
                    </div>
                </td>
            </tr>
        </MediaType>
    )
}
