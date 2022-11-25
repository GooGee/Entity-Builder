import { makeColumnTypeFormat } from "@/Database/Factory/makeColumn"
import { makeColumnCRUD } from "@/Database/makeCRUD"
import getCollectionItemzz from "@/Service/getCollectionItemzz"
import useColumnzzStore from "@/Store/useColumnzzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import { useEffect, useState } from "react"
import Column from "./Column"
import useFilezzStore from "@/Store/useFilezzStore"
import SelectButton from "../Button/SelectButton"
import FileButton from "../Button/FileButton"

interface Property {
    schema: LB.Schema
}

export default function ColumnList(property: Property) {
    const sColumnzzStore = useColumnzzStore()
    const sFilezzStore = useFilezzStore()
    const sToastzzStore = useToastzzStore()

    const [columnzz, setColumnzz] = useState<LB.Column[]>([])

    const namezz = getCollectionItemzz("CommonColumnName")
    const typezz = getCollectionItemzz("CommonColumnType")

    const model = sFilezzStore.itemzz.find((item) => item.name === "ModelBase")

    useEffect(() => {
        setColumnzz(
            sColumnzzStore.itemzz.filter(
                (item) => item.schemaId === property.schema.id,
            ),
        )
    }, [property.schema, sColumnzzStore.itemzz])

    function add(name: string, type: string, value: string) {
        const length = ["binary", "decimal", "string"].includes(type)
            ? "decimal" === type
                ? 11
                : 111
            : 0

        makeColumnCRUD()
            .create(makeColumnTypeFormat(property.schema.id, name, type, value, length))
            .catch(sToastzzStore.showError)
    }

    return (
        <table className="table">
            <caption>
                <h3 className="inline me-3">Column</h3>
                {model === undefined ? (
                    <span className="text-danger">File ModelBase not found</span>
                ) : (
                    <FileButton
                        action={""}
                        file={model}
                        fullName
                        schema={property.schema}
                    ></FileButton>
                )}
            </caption>
            <thead>
                <tr>
                    <th>inTable / name</th>
                    <th>type</th>
                    <th>default</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {columnzz.map((item) => (
                    <Column key={item.id} item={item}></Column>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td>
                        <SelectButton
                            isAdd
                            itemzz={namezz}
                            value={0}
                            change={(selected, found) => {
                                if (found) {
                                    add(found.name, found.tag, found.value)
                                }
                            }}
                        ></SelectButton>
                    </td>
                    <td>
                        <SelectButton
                            isAdd
                            itemzz={typezz}
                            value={0}
                            change={(selected, found) => {
                                if (found) {
                                    add(found.name, found.tag, found.value)
                                }
                            }}
                        ></SelectButton>
                    </td>
                    <td></td>
                    <td></td>
                </tr>
            </tfoot>
        </table>
    )
}
