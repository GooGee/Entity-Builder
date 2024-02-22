import { makeRequestCRUD } from "@/Database/makeCRUD"
import useRequestPageStore from "@/Store/useRequestPageStore"
import useToastzzStore from "@/Store/useToastzzStore"
import MediaType from "./MediaType"

interface Property {
    item: LB.Request
}

export default function RequestDetail(property: Property) {
    const sRequestPageStore = useRequestPageStore()
    const sToastzzStore = useToastzzStore()

    function update(item: LB.Request) {
        sRequestPageStore.setItem(item)
        makeRequestCRUD()
            .update(item)
            .then((response) => sRequestPageStore.setItem(response))
            .catch(sToastzzStore.showError)
    }

    return (
        <MediaType item={property.item} isRequest={true} update={update}>
            <tr>
                <td>required</td>
                <td>
                    <div className="form-check form-switch">
                        <input
                            checked={property.item.required}
                            onChange={(event) =>
                                update({
                                    ...property.item,
                                    required: event.target.checked,
                                })
                            }
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id={"requiredSwitchCheck" + property.item.id}
                        />
                        <label className="form-check-label" htmlFor={"requiredSwitchCheck" + property.item.id}></label>
                    </div>
                </td>
            </tr>
        </MediaType>
    )
}
