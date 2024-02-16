import CRUD from "@/Database/CRUD"
import { SideBarDataType } from "@/Factory/makeSideBarStoreData"
import useToastzzStore from "@/Store/useToastzzStore"
import { SweetAlertResult } from "sweetalert2"
import showConfirm from "../Dialog/showConfirm"

interface Property {
    item: LB.SideBarItem
    message: string
    validateName?: boolean
    makeCRUD(): CRUD<LB.SideBarItem>
    onDeleteBefore?(): Promise<any>
    showDialog(text: string, inputValue: string): Promise<SweetAlertResult<any>>
    useItemPageStore(): SideBarDataType<LB.SideBarItem>
}

export default function RightTop(property: Property) {
    const sPageStore = property.useItemPageStore()
    const sToastzzStore = useToastzzStore()

    function update(data: LB.SideBarItem) {
        sPageStore.setItem(data)
        property
            .makeCRUD()
            .update(data)
            .then((response) => sPageStore.setItem(response))
            .catch(sToastzzStore.showError)
    }

    return (
        <div className="input-group mb-3">
            {property.item.reserved ? (
                <span className="btn btn-outline-secondary">{property.item.name}</span>
            ) : (
                <>
                    <button
                        onClick={function () {
                            showConfirm()
                                .then(function (response) {
                                    if (response.isConfirmed) {
                                        const promis = property.onDeleteBefore ?? Promise.resolve

                                        return promis().then(() =>
                                            property.makeCRUD().delete(property.item.id).catch(sToastzzStore.showError),
                                        )
                                    }
                                })
                                .catch(sToastzzStore.showError)
                        }}
                        className="btn btn-outline-primary danger"
                        type="button"
                    >
                        -
                    </button>
                    <button
                        onClick={function () {
                            property
                                .showDialog(property.message, property.item.name)
                                .then((response) => {
                                    if (response.isConfirmed) {
                                        return update({
                                            ...property.item,
                                            name: response.value,
                                        })
                                    }
                                })
                                .catch(sToastzzStore.showError)
                        }}
                        className="btn btn-outline-primary"
                        type="button"
                    >
                        {property.item.name}
                    </button>
                </>
            )}

            <input
                value={property.item.description}
                onChange={(event) =>
                    update({
                        ...property.item,
                        description: event.target.value,
                    })
                }
                type="text"
                className="form-control"
                placeholder="description"
            />
        </div>
    )
}
