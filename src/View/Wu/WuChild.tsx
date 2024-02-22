import { makeTypeFormatCRUD } from "@/Database/makeCRUD"
import makeNotFoundText from "@/Factory/makeNotFoundText"
import useColumnzzStore from "@/Store/useColumnzzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import useTypeFormatzzStore from "@/Store/useTypeFormatzzStore"
import useWuColumnzzStore from "@/Store/useWuColumnzzStore"
import ArgumentList from "../Reference/ArgumentList"

interface Property {
    tf: LB.TypeFormat
    wu: LB.Wu
}

export default function WuChild(property: Property) {
    const sColumnzzStore = useColumnzzStore()
    const sToastzzStore = useToastzzStore()
    const sTypeFormatzzStore = useTypeFormatzzStore()
    const sWuColumnzzStore = useWuColumnzzStore()

    const set: Set<number> = new Set()
    sWuColumnzzStore.itemzz.forEach((item) => (item.wuId === property.tf.wuId ? set.add(item.columnId) : null))

    const columnzz = sColumnzzStore.itemzz.filter((item) => set.has(item.id))
    if (columnzz.length === 0) {
        return (
            <tr>
                <td colSpan={3}>{makeView()}</td>
            </tr>
        )
    }

    function makeType(column: LB.Column) {
        const tf = sTypeFormatzzStore.itemzz.find((item) => item.ownerColumnId === column.id)
        if (tf === undefined) {
            return <span>{makeNotFoundText("TypeFormat", "")}</span>
        }

        return (
            <span>
                {tf.type}
                {tf.isArray ? "[]" : ""}
            </span>
        )
    }

    function makeView() {
        return (
            <>
                <div>
                    <button
                        className="btn btn-outline-danger"
                        type="button"
                        onClick={function () {
                            makeTypeFormatCRUD().delete(property.tf.id).catch(sToastzzStore.showError)
                        }}
                    >
                        - {property.wu.name}
                    </button>
                </div>

                <ArgumentList item={property.tf} wuId={property.wu.id}></ArgumentList>
            </>
        )
    }

    return (
        <>
            {columnzz.map((item, index) => (
                <tr key={item.id}>
                    {index === 0 ? <td rowSpan={columnzz.length}>{makeView()}</td> : null}
                    <td>{item.name}</td>
                    <td>{makeType(item)}</td>
                </tr>
            ))}
        </>
    )
}
