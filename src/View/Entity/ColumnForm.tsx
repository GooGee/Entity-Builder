import makeNumberInputHandler from "@/Factory/makeNumberInputHandler"
import { ReactNode } from "react"

interface Property {
    children?: ReactNode
    item: LB.Column
    update(item: LB.Column): void
}

export default function ColumnForm(property: Property) {
    return (
        <div>
            <div className="mb-3">
                <div className="form-check form-switch">
                    <input
                        checked={property.item.nullable}
                        onChange={function (event) {
                            const nullable = event.target.checked
                            property.update({
                                ...property.item,
                                nullable,
                            })
                        }}
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="nullableSwitchCheck"
                    />
                    <label className="form-check-label" htmlFor="nullableSwitchCheck">
                        nullable
                    </label>
                </div>
            </div>
            <div className="mb-3">
                <div className="form-check form-switch">
                    <input
                        checked={property.item.unsigned}
                        onChange={(event) =>
                            property.update({
                                ...property.item,
                                unsigned: event.target.checked,
                            })
                        }
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="unsignedSwitchCheck"
                    />
                    <label className="form-check-label" htmlFor="unsignedSwitchCheck">
                        unsigned
                    </label>
                </div>
            </div>
            <div className="mb-3">
                <label className="form-label">length</label>
                <input
                    value={property.item.length}
                    onChange={makeNumberInputHandler("length", property.item, property.update)}
                    type="number"
                    min={0}
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label className="form-label">scale</label>
                <input
                    value={property.item.scale}
                    onChange={makeNumberInputHandler("scale", property.item, property.update)}
                    type="number"
                    min={0}
                    className="form-control"
                />
            </div>

            {property.children}

            <div className="mb-3">
                <label className="form-label">comment</label>
                <textarea
                    value={property.item.comment}
                    onChange={(event) =>
                        property.update({
                            ...property.item,
                            comment: event.target.value,
                        })
                    }
                    rows={3}
                    className="form-control"
                ></textarea>
            </div>
        </div>
    )
}
