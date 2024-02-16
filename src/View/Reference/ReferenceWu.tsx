import deleteTypeFormatArgument from "@/Service/deleteTypeFormatArgument"
import useWuzzStore from "@/Store/useWuzzStore"
import ArgumentList from "./ArgumentList"
import createTypeFormatArgumentzz from "@/Factory/createTypeFormatArgumentzz"
import useListModalStore from "@/Store/useListModalStore"
import useToastzzStore from "@/Store/useToastzzStore"
import makeNotFoundText from "@/Factory/makeNotFoundText"

interface Property {
    className?: string
    item: LB.TypeFormat
    wuId?: number
    update(item: LB.TypeFormat): Promise<any>
}

export default function ReferenceWu(property: Property) {
    const sWuzzStore = useWuzzStore()

    const wu = sWuzzStore.itemzz.find((item) => item.id === property.item.wuId)

    function showList() {
        useListModalStore.getState().openCB(
            "Please select a Wu",
            sWuzzStore.itemzz.map((item) => item.name),
            function (text) {
                const found = sWuzzStore.findByName(text)
                if (found == null) {
                    return
                }
                if (found.id === property.item.wuId) {
                    return
                }

                const old = property.item
                property
                    .update({
                        ...property.item,
                        wuId: found.id,
                    })
                    .then(() => deleteTypeFormatArgument(old.id))
                    .then(() => createTypeFormatArgumentzz(found.id, old.id))
                    .catch(useToastzzStore.getState().showError)
            },
        )
    }

    return (
        <div className={property.className}>
            <button onClick={showList} className="btn btn-outline-primary" type="button">
                {wu?.name ?? makeNotFoundText("Wu", property.item.wuId)}
            </button>

            <ArgumentList item={property.item} wuId={property.wuId}></ArgumentList>
        </div>
    )
}
