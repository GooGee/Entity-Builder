import useColumnzzStore from "@/Store/useColumnzzStore"
import useFlowPageStore, { StepEnum } from "@/Store/useFlowPageStore"
import useWuColumnzzStore from "@/Store/useWuColumnzzStore"
import WuColumnList from "../Wu/WuColumnList"

interface Property {
    empty: boolean
    wu?: LB.Wu
}

export default function ResponseColumnList(property: Property) {
    const sColumnzzStore = useColumnzzStore()
    const sFlowPageStore = useFlowPageStore()
    const sWuColumnzzStore = useWuColumnzzStore()

    if (property.empty || property.wu === undefined) {
        return null
    }

    if (sFlowPageStore.step === StepEnum.Response) {
        return (
            <WuColumnList
                item={property.wu}
                caption={
                    <caption>
                        <h3 className="text-dark">Wu {property.wu.name}</h3>
                    </caption>
                }
            ></WuColumnList>
        )
    }

    const wu = property.wu

    const columnzz = sColumnzzStore.itemzz.filter(
        (item) => item.entityId === wu.entityId,
    )
    const wcm = new Map(columnzz.map((item) => [item.id, item]))
    const wczz = sWuColumnzzStore.itemzz.filter((item) => item.wuId === wu.id)

    if (wczz.length === 0) {
        return <div className="text-danger">no column in Wu {property.wu.name}</div>
    }

    return (
        <table className="table">
            <tbody>
                {wczz.map((item) => (
                    <tr key={item.id}>
                        <td className="w111">
                            {item.alias ? item.alias : wcm.get(item.columnId)?.name}
                        </td>
                        <td>{wcm.get(item.columnId)?.type}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
