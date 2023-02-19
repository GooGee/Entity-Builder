import { makeColumnCRUD } from "@/Database/makeCRUD"
import useToastzzStore from "@/Store/useToastzzStore"
import SelectMapButton from "../Button/SelectMapButton"

interface Property {
    item: LB.Column
    entity: LB.Entity
    nnzz: Array<[string, string]>
}

export default function RacColumn(property: Property) {
    const sToastzzStore = useToastzzStore()

    function update(data: LB.Column) {
        makeColumnCRUD().update(data).catch(sToastzzStore.showError)
    }

    return (
        <tr>
            <td>{property.item.name}</td>
            <td>
                <SelectMapButton
                    itemzz={property.nnzz}
                    value={property.item.raField}
                    change={function (raField) {
                        update({
                            ...property.item,
                            raField,
                        })
                    }}
                ></SelectMapButton>
            </td>
            <td>
                <SelectMapButton
                    itemzz={property.nnzz}
                    value={property.item.raInput}
                    change={function (raInput) {
                        update({
                            ...property.item,
                            raInput,
                        })
                    }}
                ></SelectMapButton>
            </td>
        </tr>
    )
}
