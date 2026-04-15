import { makeTypeFormatCRUD } from "@/Database/makeCRUD"
import createColumnTypeFormat from "@/Factory/createColumnTypeFormat"
import getCollectionItemzz from "@/Service/getCollectionItemzz"
import useColumnzzStore from "@/Store/useColumnzzStore"
import useFilezzStore from "@/Store/useFilezzStore"
import useImportModalStore from "@/Store/useImportModalStore"
import useToastzzStore from "@/Store/useToastzzStore"
import { useState, useEffect } from "react"
import FileButton from "../Button/FileButton"
import SelectButton from "../Button/SelectButton"
import Column from "./Column"
import Swal from "sweetalert2"

interface Property {
    entity: LB.Entity
}

export default function ColumnList(property: Property) {
    const sColumnzzStore = useColumnzzStore()
    const sFilezzStore = useFilezzStore()
    const sImportModalStore = useImportModalStore()
    const sToastzzStore = useToastzzStore()

    const [columnzz, setColumnzz] = useState<LB.Column[]>([])

    const namezz = getCollectionItemzz("CommonColumnName")
    const typezz = getCollectionItemzz("CommonColumnType")

    const model = sFilezzStore.itemzz.find((item) => item.name === "ModelBase")

    useEffect(() => {
        setColumnzz(sColumnzzStore.itemzz.filter((item) => item.entityId === property.entity.id))
    }, [property.entity, sColumnzzStore.itemzz])

    function add(
        name: string,
        type: string,
        value: string,
        comment: string = "",
        length: number = 0,
        scale = 0,
        nullable = false,
    ) {
        return createColumnTypeFormat(
            property.entity.id,
            name,
            type,
            value,
            "decimal" === type ? 11 : length,
            "",
            comment,
            true,
            undefined,
            nullable,
            scale,
        ).catch(sToastzzStore.showError)
    }

    return (
        <table className="table">
            <caption>
                <h3 className="inline me-3">Column</h3>
                {model === undefined ? (
                    <span className="text-danger">File ModelBase not found</span>
                ) : property.entity.isTable ? (
                    <FileButton file={model} fullName entity={property.entity}></FileButton>
                ) : null}
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
                    <td>
                        <button
                            onClick={function () {
                                sImportModalStore.openCB(
                                    property.entity.id,
                                    "import column",
                                    undefined,
                                    function (text) {
                                        if (text === "") {
                                            return
                                        }
                                        try {
                                            const zz = JSON.parse(text)
                                            if (Array.isArray(zz) === false) {
                                                sToastzzStore.showDanger("text is not JSON array")
                                                return
                                            }
                                            zz.forEach((item: any) => {
                                                if (typeof item === "string") {
                                                    item = { name: item }
                                                }
                                                const name = item["name"] ?? ""
                                                if (name === "") {
                                                    return
                                                }
                                                add(
                                                    name,
                                                    item["type"] ?? "",
                                                    item["default"] ?? "",
                                                    item["comment"] ?? "",
                                                    item["length"] ?? 0,
                                                    item["scale"] ?? 0,
                                                    item["nullable"] ?? false,
                                                )
                                            })
                                        } catch (error) {
                                            sToastzzStore.showError(error)
                                        }
                                    },
                                    `[
{ "name": "Id", "type": "integer" }
]`,
                                )
                            }}
                            className="btn btn-outline-primary"
                        >
                            import
                        </button>
                    </td>
                    <td>
                        <button
                            className="btn btn-outline-success"
                            type="button"
                            onClick={function () {
                                const text = JSON.stringify(
                                    columnzz.map(function (item) {
                                        return {
                                            name: item.name,
                                            type: item.type,
                                            default: item.default,
                                            comment: item.comment,
                                            length: item.length,
                                            scale: item.scale,
                                            nullable: item.nullable,
                                        }
                                    }),
                                )
                                Swal.fire({
                                    confirmButtonColor: "#09f",
                                    confirmButtonText: "Copy",
                                    input: "textarea",
                                    inputValue: text,
                                    text: "export",
                                    width: "88%",
                                }).then(function (result) {
                                    if (result.isConfirmed === false) {
                                        return
                                    }
                                    navigator.clipboard.writeText(text)
                                    sToastzzStore.showOK()
                                })
                            }}
                        >
                            export
                        </button>
                    </td>
                </tr>
            </tfoot>
        </table>
    )
}
