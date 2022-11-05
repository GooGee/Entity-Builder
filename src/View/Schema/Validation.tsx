import { makeColumnCRUD } from "@/Database/makeCRUD"
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
    schema: LB.Schema
}

export default function Validation(property: Property) {
    const columnzzStore = useColumnzzStore()
    const sToastzzStore = useToastzzStore()

    const [columnzz, setColumnzz] = useState<LB.Column[]>([])
    const [waiting, setWaiting] = useState(false)

    const constraintzz = getCollectionItemzz("ValidationRule")

    useEffect(() => {
        setColumnzz(
            columnzzStore.itemzz.filter((item) => item.schemaId === property.schema.id),
        )
    }, [property.schema, columnzzStore.itemzz])

    function update(data: LB.Column) {
        makeColumnCRUD().update(data).catch(sToastzzStore.showError)
    }

    return (
        <table className="table table-text-right">
            <caption>
                <h3 className="inline me-3">Validation</h3>
                <span className="me-3">request constraint</span>
                <WebLink href="https://laravel.com/docs/9.x/validation">doc</WebLink>
            </caption>
            <thead>
                <tr>
                    <th className="w222">column / read only</th>
                    <th>constraint</th>
                </tr>
            </thead>
            <tbody>
                {columnzz.map((item) => (
                    <tr key={item.id}>
                        <td>
                            {item.name}
                            <div className="form-check form-switch inline wa ms-3">
                                <input
                                    checked={item.ro}
                                    onChange={function (event) {
                                        update({
                                            ...item,
                                            ro: event.target.checked,
                                        })
                                    }}
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id={"roSwitchCheck" + item.id}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor={"roSwitchCheck" + item.id}
                                ></label>
                            </div>
                        </td>
                        <td>
                            <ConstraintList
                                constraintzz={constraintzz}
                                item={item}
                                update={function (constraintzz) {
                                    update({
                                        ...item,
                                        constraintzz,
                                    })
                                }}
                            ></ConstraintList>
                        </td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td>
                        <div className="btn-group">
                            <EditButton
                                file={getFileFullNameInCode(ValidationCodeFileName)}
                                content={Constant.ScriptCode}
                            ></EditButton>
                            <WaitingButton
                                waiting={waiting}
                                onClick={function () {
                                    setWaiting(true)
                                    runCodeFile(ValidationCodeFileName, property.schema)
                                        .then((response) =>
                                            makeColumnCRUD().updateMany(
                                                response.result as LB.Column[],
                                            ),
                                        )
                                        .then(() => {
                                            setWaiting(false)
                                            sToastzzStore.showOK()
                                        })
                                        .catch((error) => {
                                            setWaiting(false)
                                            sToastzzStore.showError(error)
                                        })
                                }}
                            >
                                Run
                            </WaitingButton>
                        </div>
                    </td>
                    <td>set constraint (select other Schema to see changes)</td>
                </tr>
            </tfoot>
        </table>
    )
}
