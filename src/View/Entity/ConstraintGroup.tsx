import { useState } from "react"

interface Property {
    add(selected: string): void
    constraintzz: LB.CollectionItem[]
}

export default function ConstraintGroup(property: Property) {
    const set: Set<string> = new Set()
    const constraintzz = [...property.constraintzz]
    constraintzz.sort((aa, bb) => aa.name.localeCompare(bb.name))
    constraintzz.forEach((item) => set.add(item.tag))
    const groupzz = Array.from(set)
    groupzz.sort((aa, bb) => aa.localeCompare(bb))

    const [group, setGroup] = useState(groupzz[0])

    return (
        <div className="d-flex">
            <ul className="list-group w111">
                {groupzz.map((item) => (
                    <li
                        key={item}
                        onClick={function () {
                            setGroup(item)
                        }}
                        className={(group === item ? "active " : "") + "list-group-item list-group-item-action pointer"}
                    >
                        {item}
                    </li>
                ))}
            </ul>

            <div className="ms-3">
                {constraintzz
                    .filter((item) => item.tag === group)
                    .map((item) => (
                        <div key={item.id}>
                            <div
                                onClick={function () {
                                    property.add(item.name)
                                }}
                                className="btn btn-outline-primary mb-1"
                            >
                                + {item.name}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}
