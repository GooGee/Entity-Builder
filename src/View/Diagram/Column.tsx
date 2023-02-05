import { makeColumnCRUD } from "@/Database/makeCRUD"
import showConfirm from "@/View/Dialog/showConfirm"
import useColumnModalStore from "@/Store/useColumnModalStore"
import useToastzzStore from "@/Store/useToastzzStore"

interface Property {
    entityId: number
    item: LB.Column
}

function Column(property: Property) {
    const modalStore = useColumnModalStore()
    const sToastzzStore = useToastzzStore()

    function removeColumn() {
        showConfirm()
            .then((response) => {
                if (response.isConfirmed) {
                    return makeColumnCRUD().delete(property.item.id)
                }
            })
            .catch(sToastzzStore.showError)
    }

    return (
        <tr>
            <td className="text-secondary ps-3">
                <button onClick={removeColumn} className="button danger" type="button">
                    -
                </button>
                {property.item.type}
            </td>
            <td>
                <span
                    onClick={() => modalStore.open(property.item.id)}
                    className="button"
                >
                    {property.item.name}
                </span>
            </td>
        </tr>
    )
}

export default Column
