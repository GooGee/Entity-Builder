import { makeWuChildCRUD } from "@/Database/makeCRUD"
import useColumnzzStore from "@/Store/useColumnzzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import useWuColumnzzStore from "@/Store/useWuColumnzzStore"
import useWuPageStore from "@/Store/useWuPageStore"
import showConfirm from "../Dialog/showConfirm"
import TypeFormatTextList from "../Reference/TypeFormatTextList"

interface Property {
    item: LB.WuChild
    wu?: LB.Wu
}

export default function WuChild(property: Property) {
    const sColumnzzStore = useColumnzzStore()
    const sToastzzStore = useToastzzStore()
    const sWuColumnzzStore = useWuColumnzzStore()
    const sWuPageStore = useWuPageStore()

    if (property.wu === undefined) {
        return <div>-- Wu {property.item.tf.targetId} not found --</div>
    }

    const set: Set<number> = new Set()
    sWuColumnzzStore.itemzz.forEach((item) =>
        item.wuId === property.item.tf.targetId ? set.add(item.columnId) : null,
    )

    const columnzz = sColumnzzStore.itemzz.filter((item) => set.has(item.id))
    if (columnzz.length === 0) {
        return (
            <tr>
                <td colSpan={3}>{makeView()}</td>
            </tr>
        )
    }

    function makeView() {
        return (
            <>
                <div>
                    <button
                        className="btn btn-outline-primary danger"
                        type="button"
                        onClick={function () {
                            showConfirm()
                                .then((response) => {
                                    if (response.isConfirmed) {
                                        return makeWuChildCRUD().delete(
                                            property.item.id,
                                        )
                                    }
                                })
                                .catch(sToastzzStore.showError)
                        }}
                    >
                        - {property.wu!.name}
                    </button>
                </div>
                <TypeFormatTextList
                    itemzz={property.item.tf.argumentzz}
                    targetId={property.item.tf.targetId}
                    wuId={sWuPageStore.item!.id}
                    updateArgumentzz={function (argumentzz) {
                        makeWuChildCRUD().update({
                            ...property.item,
                            tf: {
                                ...property.item.tf,
                                argumentzz,
                            },
                        })
                    }}
                ></TypeFormatTextList>
            </>
        )
    }

    return (
        <>
            {columnzz.map((item, index) => (
                <tr key={item.id}>
                    {index === 0 ? (
                        <td rowSpan={columnzz.length}>{makeView()}</td>
                    ) : null}
                    <td>{item.name}</td>
                    <td>
                        {item.tf.type}
                        {item.tf.isArray ? "[]" : ""}
                    </td>
                </tr>
            ))}
        </>
    )
}
