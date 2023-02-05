import useToastzzStore from "@/Store/useToastzzStore"
import { useEffect, useState } from "react"
import Constraint from "./Constraint"
import ConstraintGroup from "./ConstraintGroup"

interface Item {
    constraintzz: LB.ColumnConstraint[]
}

interface Property {
    constraintzz: LB.CollectionItem[]
    item: Item
    update(constraintzz: LB.ColumnConstraint[]): void
}

export default function ConstraintList(property: Property) {
    const sToastzzStore = useToastzzStore()

    const [constraintzz, setConstraintzz] = useState([...property.item.constraintzz])
    const [editing, setEditing] = useState(false)

    useEffect(() => {
        setConstraintzz([...property.item.constraintzz])
    }, [property.item])

    function add(selected: string) {
        if (constraintzz.find((item) => item.name === selected)) {
            sToastzzStore.showError(selected + " already exist")
            return
        }

        setConstraintzz([...constraintzz, { name: selected, parameter: "" }])
    }

    function remove(item: LB.ColumnConstraint) {
        setConstraintzz(constraintzz.filter((one) => one.name !== item.name))
    }

    function update(item: LB.ColumnConstraint) {
        const index = constraintzz.findIndex((one) => one.name === item.name)
        if (index === -1) {
            return
        }

        const zz = [...constraintzz]
        zz.splice(index, 1, item)
        setConstraintzz(zz)
    }

    return (
        <>
            {editing ? (
                <div>
                    <button
                        onClick={() => {
                            setEditing(false)
                            property.update(constraintzz)
                        }}
                        className="btn btn-outline-primary"
                        type="button"
                    >
                        OK
                    </button>
                    <table className="table">
                        <tbody>
                            {constraintzz.map((item) => (
                                <Constraint
                                    item={item}
                                    key={item.name}
                                    remove={remove}
                                    update={update}
                                ></Constraint>
                            ))}
                        </tbody>
                    </table>

                    <ConstraintGroup
                        add={add}
                        constraintzz={property.constraintzz}
                    ></ConstraintGroup>
                </div>
            ) : (
                <ul onClick={() => setEditing(true)} className="pointer">
                    {constraintzz.length === 0 ? <li>----</li> : null}
                    {constraintzz.map((item) => (
                        <li key={item.name}>
                            {item.name}
                            {item.parameter ? <span>:{item.parameter}</span> : null}
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}
