import makeNumberInputHandler from "@/Factory/makeNumberInputHandler"
import { useState } from "react"

interface Property {
    item: LB.Column
    update(item: LB.Column): void
}

export default function ColumnDetail(property: Property) {
    const [editing, setEditing] = useState(false)

    if (editing === false) {
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
            <div onClick={() => setEditing(true)} className="pointer">
                {textzz.map((item) => (
                    <div key={item}>{item}</div>
                ))}
            </div>
        )
    }

    return (
        <div>
            <div className="mb-3">
                <button
                    onClick={() => setEditing(false)}
                    className="btn btn-outline-primary"
                    type="button"
                >
                    OK
                </button>
            </div>
            <div className="mb-3">
                <div className="form-check form-switch">
                    <input
                        checked={property.item.nullable}
                        onChange={function (event) {
                            const nullable = event.target.checked
                            const tf = {
                                ...property.item.tf,
                                nullable,
                            }
                            property.update({
                                ...property.item,
                                nullable,
                                tf,
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
                    onChange={makeNumberInputHandler(
                        "length",
                        property.item,
                        property.update,
                    )}
                    type="number"
                    min={0}
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label className="form-label">scale</label>
                <input
                    value={property.item.scale}
                    onChange={makeNumberInputHandler(
                        "scale",
                        property.item,
                        property.update,
                    )}
                    type="number"
                    min={0}
                    className="form-control"
                />
            </div>
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
