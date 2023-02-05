import { connectEntity } from "@/Database/Factory/makeRelation"
import RelationType, { getRelationMeaning } from "@/Database/RelationType"
import useListModalStore from "@/Store/useListModalStore"
import useRelationzzStore from "@/Store/useRelationzzStore"
import useEntityzzStore from "@/Store/useEntityzzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import { useEffect, useState } from "react"
import Relation from "./Relation"

interface Property {
    entity: LB.Entity
}

export default function RelationList(property: Property) {
    const sListModalStore = useListModalStore()
    const relationzzStore = useRelationzzStore()
    const entityzzStore = useEntityzzStore()
    const sToastzzStore = useToastzzStore()

    const [relationzz, setRelationzz] = useState<LB.Relation[]>([])

    useEffect(() => {
        setRelationzz(
            relationzzStore.itemzz.filter(
                (item) =>
                    item.entity0Id === property.entity.id ||
                    item.entity1Id === property.entity.id,
            ),
        )
    }, [relationzzStore.itemzz])

    function addRelation(type: RelationType) {
        sListModalStore.openCB(
            `${property.entity.name} ${getRelationMeaning(type)}`,
            entityzzStore.itemzz.map((item) => item.name),
            function (text) {
                const target = entityzzStore.findByName(text)
                if (target === undefined) {
                    throw new Error("Entity not found")
                }
                return connectEntity(type, property.entity, target).catch(
                    sToastzzStore.showError,
                )
            },
        )
    }

    return (
        <table className="table table-sm table-borderless py0">
            <caption>
                <span
                    onClick={function () {
                        addRelation(RelationType.OneToMany)
                    }}
                    className="button"
                >
                    + relation
                </span>
                <span
                    onClick={function () {
                        addRelation(RelationType.OneToOne)
                    }}
                    className="button mx-2"
                >
                    1..1
                </span>
            </caption>
            <tbody>
                {relationzz.map((item) => (
                    <Relation
                        entityId={property.entity.id}
                        item={item}
                        key={item.id}
                    ></Relation>
                ))}
            </tbody>
        </table>
    )
}
