import { makeColumnConstraintCRUD } from "@/Database/makeCRUD"
import useColumnConstraintzzStore from "@/Store/useColumnConstraintzzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import { useEffect, useState } from "react"
import Constraint from "./Constraint"
import ConstraintGroup from "./ConstraintGroup"

interface Property {
    constraintzz: LB.CollectionItem[]
    column: LB.Column
}

export default function ConstraintList(property: Property) {
    const sColumnConstraintzzStore = useColumnConstraintzzStore()
    const sToastzzStore = useToastzzStore()

    const [constraintzz, setConstraintzz] = useState<LB.ColumnConstraint[]>([])
    const [editing, setEditing] = useState(false)

    useEffect(() => {
        setConstraintzz(sColumnConstraintzzStore.itemzz.filter((item) => item.columnId === property.column.id))
    }, [property.column, sColumnConstraintzzStore.itemzz])

    function ruleText(item: LB.ColumnConstraint) {
        if (item.parameter) {
            return `${item.name}:${item.parameter}`
        }

        return item.name
    }

    return (
        <>
            {editing ? (
                <div>
                    <button onClick={() => setEditing(false)} className="btn btn-outline-primary" type="button">
                        OK
                    </button>
                    <table className="table">
                        <tbody>
                            {constraintzz.map((item) => (
                                <Constraint item={item} key={item.id}></Constraint>
                            ))}
                        </tbody>
                    </table>

                    <ConstraintGroup
                        add={function (selected: string) {
                            makeColumnConstraintCRUD()
                                .create({
                                    columnId: property.column.id,
                                    name: selected,
                                    parameter: "",
                                })
                                .catch(sToastzzStore.showError)
                        }}
                        constraintzz={property.constraintzz}
                    ></ConstraintGroup>
                </div>
            ) : (
                <ul onClick={() => setEditing(true)} className="pointer">
                    {constraintzz.length === 0 ? <li>----</li> : null}
                    {constraintzz.map((item) => (
                        <li key={item.id}>{ruleText(item)}</li>
                    ))}
                </ul>
            )}
        </>
    )
}
