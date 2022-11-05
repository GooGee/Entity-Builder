import LayerEnum from "@/Model/LayerEnum"
import { makeColumnCRUD } from "@/Database/makeCRUD"
import Constant from "@/Model/Constant"
import { FactoryCodeFileName, getFileFullNameInCode } from "@/Model/FileManager"
import runCodeFile from "@/Service/runCodeFile"
import useColumnzzStore from "@/Store/useColumnzzStore"
import useFilezzStore from "@/Store/useFilezzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import { useEffect, useState } from "react"
import EditButton from "../Button/EditButton"
import WaitingButton from "../Button/WaitingButton"
import WebLink from "../Button/WebLink"
import FactoryColumn from "./FactoryColumn"
import FileButton from "../Button/FileButton"

interface Property {
    schema: LB.Schema
}

export default function Factory(property: Property) {
    const sColumnzzStore = useColumnzzStore()
    const sFilezzStore = useFilezzStore()
    const sToastzzStore = useToastzzStore()

    const [columnzz, setColumnzz] = useState<LB.Column[]>([])
    const [waiting, setWaiting] = useState(false)

    const file = sFilezzStore.itemzz.find((item) => item.name === LayerEnum.Factory)

    useEffect(() => {
        setColumnzz(
            sColumnzzStore.itemzz.filter(
                (item) => item.schemaId === property.schema.id,
            ),
        )
    }, [property.schema, sColumnzzStore.itemzz])

    return (
        <table className="table">
            <caption>
                <h3 className="inline me-3">Factory</h3>
                {file === undefined ? (
                    <span className="text-danger">
                        File {LayerEnum.Factory} not found
                    </span>
                ) : (
                    <FileButton
                        action={""}
                        className="me-3"
                        file={file}
                        fullName
                        schema={property.schema}
                    ></FileButton>
                )}
                <WebLink href="https://laravel.com/docs/9.x/eloquent-factories">
                    doc
                </WebLink>
            </caption>
            <thead>
                <tr>
                    <th>column</th>
                    <th>Faker</th>
                    <th>PHP expression</th>
                </tr>
            </thead>
            <tbody>
                {columnzz.map((item) => (
                    <FactoryColumn key={item.id} item={item}></FactoryColumn>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={3}>
                        <div className="btn-group me-3">
                            <EditButton
                                file={getFileFullNameInCode(FactoryCodeFileName)}
                                content={Constant.ScriptCode}
                            ></EditButton>
                            <WaitingButton
                                waiting={waiting}
                                onClick={function () {
                                    setWaiting(true)
                                    runCodeFile(FactoryCodeFileName, property.schema)
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
                        set fake value (select other Schema to see changes)
                    </td>
                </tr>
            </tfoot>
        </table>
    )
}
