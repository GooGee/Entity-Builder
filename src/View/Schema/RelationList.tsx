import { connectSchema } from "@/Database/Factory/makeRelation"
import RelationType from "@/Database/RelationType"
import useColumnzzStore from "@/Store/useColumnzzStore"
import useRelationzzStore from "@/Store/useRelationzzStore"
import useSchemazzStore from "@/Store/useSchemazzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import { useState, useEffect } from "react"
import SelectButton from "../Button/SelectButton"
import Relation from "./Relation"

interface Property {
    schema: LB.Schema
}

export default function RelationList(property: Property) {
    const sColumnzzStore = useColumnzzStore()
    const sRelationzzStore = useRelationzzStore()
    const sSchemazzStore = useSchemazzStore()
    const sToastzzStore = useToastzzStore()

    const [relationzz, setRelationzz] = useState<LB.Relation[]>([])

    const columnzz = sColumnzzStore.itemzz.filter(
        (item) => item.inTable && item.schemaId === property.schema.id,
    )

    useEffect(() => {
        setRelationzz(
            sRelationzzStore.itemzz.filter(
                (item) =>
                    item.schema0Id === property.schema.id ||
                    item.schema1Id === property.schema.id,
            ),
        )
    }, [property.schema, sRelationzzStore.itemzz])

    function add(type: RelationType, schema1Id: number) {
        const found = sSchemazzStore.find(schema1Id)
        if (found) {
            connectSchema(type, property.schema, found).catch(sToastzzStore.showError)
        }
    }

    return (
        <table className="table">
            <caption>
                <h3 className="inline me-3">Relation</h3>
            </caption>
            <thead>
                <tr>
                    <th className="w222"></th>
                    <th>name</th>
                    <th>foreign key</th>
                </tr>
            </thead>
            <tbody>
                {relationzz.map((item) => (
                    <Relation
                        key={item.id}
                        columnzz={columnzz}
                        item={item}
                        schema={property.schema}
                    ></Relation>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td>
                        <SelectButton
                            itemzz={sSchemazzStore.itemzz}
                            value={0}
                            verb="has many"
                            change={(value) => {
                                add(RelationType.OneToMany, value)
                            }}
                        ></SelectButton>
                    </td>
                    <td>
                        <SelectButton
                            itemzz={sSchemazzStore.itemzz}
                            value={0}
                            verb="has one"
                            change={(value) => {
                                add(RelationType.OneToOne, value)
                            }}
                        ></SelectButton>
                    </td>
                    <td></td>
                </tr>
            </tfoot>
        </table>
    )
}
