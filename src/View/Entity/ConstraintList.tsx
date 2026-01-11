import { makeColumnConstraintCRUD } from "@/Database/makeCRUD"
import useColumnConstraintzzStore from "@/Store/useColumnConstraintzzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import { useEffect, useState } from "react"
import Constraint from "./Constraint"
import ConstraintGroup from "./ConstraintGroup"
import { ValidationCodeFileName } from "@/Model/FileManager"
import runCodeFile from "@/Service/runCodeFile"
import WaitingButton from "../Button/WaitingButton"

interface Property {
    constraintzz: LB.CollectionItem[]
    column: LB.Column
    entity: LB.Entity
}

export default function ConstraintList(property: Property) {
    const sColumnConstraintzzStore = useColumnConstraintzzStore()
    const sToastzzStore = useToastzzStore()

    const [constraintzz, setConstraintzz] = useState<LB.ColumnConstraint[]>([])
    const [editing, setEditing] = useState(false)
    const [waiting, setWaiting] = useState(false)

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
                    <div className="btn-group">
                        <button onClick={() => setEditing(false)} className="btn btn-outline-success" type="button">
                            OK
                        </button>
                        <WaitingButton
                            waiting={waiting}
                            onClick={function () {
                                setWaiting(true)
                                runCodeFile(ValidationCodeFileName, property.entity, {
                                    Column: property.column,
                                    OnlyOne: true,
                                })
                                    .then((response) =>
                                        makeColumnConstraintCRUD().updateMany(response.result as LB.ColumnConstraint[]),
                                    )
                                    .then(() => {
                                        setWaiting(false)
                                        sToastzzStore.showSuccess("Validation rules added")
                                    })
                                    .catch((error) => {
                                        setWaiting(false)
                                        sToastzzStore.showError(error)
                                    })
                            }}
                        >
                            Auto
                        </WaitingButton>
                    </div>

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
