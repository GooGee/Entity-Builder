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

    const columnzz = sColumnzzStore.itemzz.filter((item) => item.inTable && item.entityId === property.entity.id)

    useEffect(() => {
        setRelationzz(
            sRelationzzStore.itemzz.filter(
                (item) => item.entity0Id === property.entity.id || item.entity1Id === property.entity.id,
            ),
        )
    }, [property.entity, sRelationzzStore.itemzz])

    function add(type: RelationType, entity0?: LB.Entity, entity1?: LB.Entity) {
        if (entity0 && entity1) {
            connectEntity(type, entity0, entity1).catch(sToastzzStore.showError)
        }
    }

    return (
        <table className="table">
            <caption>
                <h3 className="inline me-3">Relation</h3>
            </caption>
            <thead>
                <tr>
                    <th className="w111"></th>
                    <th className="w222"></th>
                    <th>name</th>
                    <th>foreign key</th>
                </tr>
            </thead>
            <tbody>
                {relationzz.map((item) => (
                    <Relation key={item.id} columnzz={columnzz} item={item} entity={property.entity}></Relation>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td className="p-3" colSpan={4}></td>
                </tr>
                <tr>
                    <td></td>
                    <td colSpan={3}>
                        <div className="d-flex align-items-center">
                            <div>{property.entity.name} has many</div>
                            <div className="ms-2">
                                <SelectButton
                                    isAdd={true}
                                    itemzz={sEntityzzStore.itemzz}
                                    value={0}
                                    change={(value) =>
                                        add(RelationType.OneToMany, property.entity, sEntityzzStore.find(value))
                                    }
                                ></SelectButton>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td colSpan={3}>
                        <div className="d-flex align-items-center">
                            <div>{property.entity.name} has one</div>
                            <div className="ms-2">
                                <SelectButton
                                    isAdd={true}
                                    itemzz={sEntityzzStore.itemzz}
                                    value={0}
                                    change={(value) =>
                                        add(RelationType.OneToOne, property.entity, sEntityzzStore.find(value))
                                    }
                                ></SelectButton>
                            </div>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td></td>
                    <td colSpan={3}>
                        <div className="d-flex align-items-center">
                            <div>
                                <SelectButton
                                    isAdd={true}
                                    itemzz={sEntityzzStore.itemzz}
                                    value={0}
                                    change={(value) =>
                                        add(RelationType.OneToMany, sEntityzzStore.find(value), property.entity)
                                    }
                                ></SelectButton>
                            </div>
                            <div className="ms-2">has many {property.entity.name}</div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td colSpan={3}>
                        <div className="d-flex align-items-center">
                            <div>
                                <SelectButton
                                    isAdd={true}
                                    itemzz={sEntityzzStore.itemzz}
                                    value={0}
                                    change={(value) =>
                                        add(RelationType.OneToOne, sEntityzzStore.find(value), property.entity)
                                    }
                                ></SelectButton>
                            </div>
                            <div className="ms-2">has one {property.entity.name}</div>
                        </div>
                    </td>
                </tr>
            </tfoot>
        </table>
    )
}
