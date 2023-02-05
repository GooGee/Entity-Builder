import { makeIndexColumnCRUD } from "@/Database/makeCRUD"
import getItemName from "@/Service/getItemName"
import useToastzzStore from "@/Store/useToastzzStore"

interface Property {
    cicm: Map<number, LB.Column>
    item: LB.IndexColumn
    refresh(): void
}

export default function IndexColumn(property: Property) {
    const sToastzzStore = useToastzzStore()

    return (
        <>
            <button
                onClick={function () {
                    makeIndexColumnCRUD()
                        .delete(property.item.id)
                        .then(() => property.refresh())
                        .catch(sToastzzStore.showError)
                }}
                className="button danger"
                type="button"
            >
                -
            </button>
            {getItemName(property.cicm.get(property.item.columnId))}
        </>
    )
}
