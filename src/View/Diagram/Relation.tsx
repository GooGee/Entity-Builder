import showConfirm from "@/View/Dialog/showConfirm"
import useToastzzStore from "@/Store/useToastzzStore"
import { makeRelationCRUD } from "@/Database/makeCRUD"
import useRelationModalStore from "@/Store/useRelationModalStore"
import { getRelationMeaning } from "@/Database/RelationType"

interface Property {
    entityId: number
    item: LB.Relation
}

export default function Relation(property: Property) {
    const modalStore = useRelationModalStore()
    const sToastzzStore = useToastzzStore()

    const reversed = property.entityId !== property.item.entity0Id

    return (
        <tr>
            <td className="text-secondary ps-3">
                <button
                    onClick={function () {
                        showConfirm()
                            .then((response) => {
                                if (response.isConfirmed) {
                                    return makeRelationCRUD().delete(property.item.id)
                                }
                            })
                            .catch(sToastzzStore.showError)
                    }}
                    className="button danger"
                    type="button"
                >
                    -
                </button>
                {getRelationMeaning(property.item.type, reversed)}
            </td>
            <td>
                <span
                    onClick={() => modalStore.open(property.item.id)}
                    className="button"
                >
                    {reversed ? property.item.name1 : property.item.name0}
                </span>
            </td>
        </tr>
    )
}
