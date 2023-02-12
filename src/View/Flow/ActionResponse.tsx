import { makeModuleActionResponseCRUD } from "@/Database/makeCRUD"
import makeNotFoundText from "@/Factory/makeNotFoundText"
import useResponsezzStore from "@/Store/useResponsezzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import useTypeFormatzzStore from "@/Store/useTypeFormatzzStore"
import SelectButton from "../Button/SelectButton"
import showConfirm from "../Dialog/showConfirm"
import TypeFormatText from "../Reference/TypeFormatText"

interface Property {
    item: LB.ModuleActionResponse
    refresh(): void
    statuszz: LB.CollectionItem[]
}

export default function ActionResponse(property: Property) {
    const sResponsezzStore = useResponsezzStore()
    const sToastzzStore = useToastzzStore()
    const sTypeFormatzzStore = useTypeFormatzzStore()

    const response = sResponsezzStore.find(property.item.responseId)

    function makeView() {
        if (response === undefined) {
            return (
                <span className="text-danger">
                    {makeNotFoundText("", property.item.responseId)}
                </span>
            )
        }

        const tf = sTypeFormatzzStore.itemzz.find(
            (item) => item.ownerResponseId === response.id,
        )
        if (tf === undefined) {
            return <div>{makeNotFoundText("TypeFormat", "")}</div>
        }

        return <TypeFormatText id={property.item.id} item={tf}></TypeFormatText>
    }

    function update(item: LB.ModuleActionResponse) {
        return makeModuleActionResponseCRUD()
            .update(item)
            .then(property.refresh)
            .catch(sToastzzStore.showError)
    }

    return (
        <tr>
            <td>
                <div className="input-group">
                    <button
                        onClick={function () {
                            showConfirm()
                                .then((response) => {
                                    if (response.isConfirmed) {
                                        return makeModuleActionResponseCRUD()
                                            .delete(property.item.id)
                                            .then(property.refresh)
                                    }
                                })
                                .catch(sToastzzStore.showError)
                        }}
                        className="btn btn-outline-primary danger"
                        type="button"
                    >
                        -
                    </button>
                    <SelectButton
                        itemzz={property.statuszz}
                        value={
                            property.statuszz.find(
                                (item) => item.name === property.item.status,
                            )?.id ?? 0
                        }
                        change={function (id, item) {
                            update({
                                ...property.item,
                                status: item?.name ?? "",
                            })
                        }}
                    ></SelectButton>
                </div>
            </td>
            <td>
                <SelectButton
                    className="wa"
                    itemzz={sResponsezzStore.itemzz}
                    value={property.item.responseId}
                    change={function (id) {
                        update({
                            ...property.item,
                            responseId: id,
                        })
                    }}
                ></SelectButton>
            </td>
            <td>{makeView()}</td>
        </tr>
    )
}
