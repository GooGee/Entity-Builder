import { connectSchema } from "@/Database/Factory/makeRelation"
import RelationType, { getRelationMeaning } from "@/Database/RelationType"
import useListModalStore from "@/Store/useListModalStore"
import useRelationzzStore from "@/Store/useRelationzzStore"
import useSchemazzStore from "@/Store/useSchemazzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import { useEffect, useState } from "react"
import Relation from "./Relation"

interface Property {
    schema: LB.Schema
}

export default function RelationList(property: Property) {
    const sListModalStore = useListModalStore()
    const relationzzStore = useRelationzzStore()
    const schemazzStore = useSchemazzStore()
    const sToastzzStore = useToastzzStore()

    const [relationzz, setRelationzz] = useState<LB.Relation[]>([])

    useEffect(() => {
        setRelationzz(
            relationzzStore.itemzz.filter(
                (item) =>
                    item.schema0Id === property.schema.id ||
                    item.schema1Id === property.schema.id,
            ),
        )
    }, [relationzzStore.itemzz])

    function addRelation(type: RelationType) {
        sListModalStore.openCB(
            `${property.schema.name} ${getRelationMeaning(type)}`,
            schemazzStore.itemzz.map((item) => item.name),
            function (text) {
                const target = schemazzStore.findByName(text)
                if (target === undefined) {
                    throw new Error("Schema not found")
                }
                return connectSchema(type, property.schema, target).catch(
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
                        schemaId={property.schema.id}
                        item={item}
                        key={item.id}
                    ></Relation>
                ))}
            </tbody>
        </table>
    )
}
