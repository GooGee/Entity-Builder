import { connectEntity } from "@/Database/Factory/makeRelation"
import RelationType from "@/Database/RelationType"
import useColumnzzStore from "@/Store/useColumnzzStore"
import useRelationzzStore from "@/Store/useRelationzzStore"
import useEntityzzStore from "@/Store/useEntityzzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import { useState, useEffect } from "react"
import SelectButton from "../Button/SelectButton"
import Relation from "./Relation"

interface Property {
    entity: LB.Entity
}

export default function RelationList(property: Property) {
    const sColumnzzStore = useColumnzzStore()
    const sRelationzzStore = useRelationzzStore()
    const sEntityzzStore = useEntityzzStore()
    const sToastzzStore = useToastzzStore()

    const [relationzz, setRelationzz] = useState<LB.Relation[]>([])

    const columnzz = sColumnzzStore.itemzz.filter(
        (item) => item.inTable && item.entityId === property.entity.id,
    )

    useEffect(() => {
        setRelationzz(
            sRelationzzStore.itemzz.filter(
                (item) =>
                    item.entity0Id === property.entity.id ||
                    item.entity1Id === property.entity.id,
            ),
        )
    }, [property.entity, sRelationzzStore.itemzz])

    function add(type: RelationType, entity1Id: number) {
        const found = sEntityzzStore.find(entity1Id)
        if (found) {
            connectEntity(type, property.entity, found).catch(sToastzzStore.showError)
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
                        entity={property.entity}
                    ></Relation>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td>
                        <SelectButton
                            itemzz={sEntityzzStore.itemzz}
                            value={0}
                            verb="has many"
                            change={(value) => {
                                add(RelationType.OneToMany, value)
                            }}
                        ></SelectButton>
                    </td>
                    <td>
                        <SelectButton
                            itemzz={sEntityzzStore.itemzz}
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
