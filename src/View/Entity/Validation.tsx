import { makeColumnConstraintCRUD } from "@/Database/makeCRUD"
import Constant from "@/Model/Constant"
import { getFileFullNameInCode, ValidationCodeFileName } from "@/Model/FileManager"
import getCollectionItemzz from "@/Service/getCollectionItemzz"
import runCodeFile from "@/Service/runCodeFile"
import useColumnzzStore from "@/Store/useColumnzzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import { useState, useEffect } from "react"
import EditButton from "../Button/EditButton"
import WaitingButton from "../Button/WaitingButton"
import WebLink from "../Button/WebLink"
import ConstraintList from "./ConstraintList"

interface Property {
    entity: LB.Entity
}

export default function Validation(property: Property) {
    const columnzzStore = useColumnzzStore()
    const sToastzzStore = useToastzzStore()

    const [columnzz, setColumnzz] = useState<LB.Column[]>([])
    const [waiting, setWaiting] = useState(false)

    const constraintzz = getCollectionItemzz("ValidationRule")

    useEffect(() => {
        setColumnzz(columnzzStore.itemzz.filter((item) => item.entityId === property.entity.id))
    }, [property.entity, columnzzStore.itemzz])

    return (
        <table className="table">
            <caption>
                <h3 className="inline me-3">Validation</h3>
                <span className="me-3">request constraint</span>
                <WebLink href="https://laravel.com/docs/9.x/validation">doc</WebLink>
            </caption>
            <thead>
                <tr>
                    <th className="w111">name</th>
                    <th>constraint</th>
                </tr>
            </thead>
            <tbody>
                {columnzz.map((item) => (
                    <tr key={item.id}>
                        <td>
                            <span className={item.inTable ? "" : "text-secondary"}>{item.name}</span>
                        </td>
                        <td>
                            <ConstraintList
                                constraintzz={constraintzz}
                                column={item}
                                entity={property.entity}
                            ></ConstraintList>
                        </td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td>
                        <EditButton
                            file={getFileFullNameInCode(ValidationCodeFileName)}
                            content={Constant.ScriptCode}
                        ></EditButton>
                    </td>
                    <td>
                        <span className="mx-1">set all constraints</span>

                        <WaitingButton
                            waiting={waiting}
                            onClick={function () {
                                setWaiting(true)
                                runCodeFile(ValidationCodeFileName, property.entity)
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
                            Run
                        </WaitingButton>
                    </td>
                </tr>
            </tfoot>
        </table>
    )
}
