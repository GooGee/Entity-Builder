import { makeColumnTypeFormat } from "@/Database/Factory/makeColumn"
import makeTypeFormat from "@/Database/Factory/makeTypeFormat"
import { makeColumnCRUD, makeTypeFormatCRUD } from "@/Database/makeCRUD"
import { DoctrineOapiMap } from "@/Model/Oapi"
import getCollectionItemzz from "@/Service/getCollectionItemzz"
import useColumnzzStore from "@/Store/useColumnzzStore"
import useFilezzStore from "@/Store/useFilezzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import { useState, useEffect } from "react"
import FileButton from "../Button/FileButton"
import SelectButton from "../Button/SelectButton"
import Column from "./Column"

interface Property {
    entity: LB.Entity
}

export default function ColumnList(property: Property) {
    const sColumnzzStore = useColumnzzStore()
    const sFilezzStore = useFilezzStore()
    const sToastzzStore = useToastzzStore()

    const [columnzz, setColumnzz] = useState<LB.Column[]>([])

    const cizz = getCollectionItemzz("DoctrineColumnType")
    const namezz = getCollectionItemzz("CommonColumnName")
    const typezz = getCollectionItemzz("CommonColumnType")

    const model = sFilezzStore.itemzz.find((item) => item.name === "ModelBase")

    useEffect(() => {
        setColumnzz(
            sColumnzzStore.itemzz.filter(
                (item) => item.entityId === property.entity.id,
            ),
        )
    }, [property.entity, sColumnzzStore.itemzz])

    function add(name: string, type: string, value: string) {
        const length = ["binary", "decimal", "string"].includes(type)
            ? "decimal" === type
                ? 11
                : 111
            : 0

        return makeColumnCRUD()
            .create(makeColumnTypeFormat(property.entity.id, name, type, value, length))
            .then((item) => {
                const data = makeTypeFormat(
                    DoctrineOapiMap.get(
                        cizz.find((item) => item.name === type)?.tag ?? "",
                    ),
                )
                data.ownerColumnId = item.id
                return makeTypeFormatCRUD().create(data)
            })
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
                        entity={property.entity}
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
