import useToastzzStore from "@/Store/useToastzzStore"
import SelectButton from "../Button/SelectButton"

interface Property {
    fieldName: string
    itemzz: LB.IdItem[]
    source: LB.IdNameItem[]
    title?: string
    create(id: number): Promise<any>
    delete(id: number): Promise<any>
}

export default function ItemList(property: Property) {
    const sToastzzStore = useToastzzStore()

    function getName(item: LB.IdItem) {
        if (property.fieldName in item) {
            //
        } else {
            throw new Error(`field ${property.fieldName} not exists`)
        }
        const data = item as any
        const targetId = data[property.fieldName]
        const found = property.source.find((item) => item.id === targetId)
        if (found) {
            return found.name
        }
        return `${property.fieldName} ${targetId} not found`
    }

    return (
        <ul className="list-unstyled">
            <li className="mb-1">
                {property.title ? (
                    <h3 className="inline me-3">{property.title}</h3>
                ) : null}
                <SelectButton
                    isAdd
                    itemzz={property.source}
                    value={0}
                    change={function (id) {
                        property
                            .create(id)
                            .catch(sToastzzStore.showError)
                    }}
                    className="inline wa"
                ></SelectButton>
            </li>
            {property.itemzz.map((item) => (
                <li key={item.id} className="mb-1">
                    <button
                        onClick={function () {
                            return property
                                .delete(item.id)
                                .catch(sToastzzStore.showError)
                        }}
                        className="btn btn-outline-primary danger"
                        type="button"
                    >
                        {"- "}
                        {getName(item)}
                    </button>
                </li>
            ))}
        </ul>
    )
}
