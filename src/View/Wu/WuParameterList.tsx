import makeWuParameter from "@/Database/Factory/makeWuParameter"
import { makeWuParameterCRUD } from "@/Database/makeCRUD"
import useToastzzStore from "@/Store/useToastzzStore"
import useWuParameterzzStore from "@/Store/useWuParameterzzStore"
import { useEffect, useState } from "react"
import showNameInput from "../Dialog/showNameInput"
import WuParameter from "./WuParameter"

interface Property {
    item: LB.Wu
}

export default function WuParameterList(property: Property) {
    const sToastzzStore = useToastzzStore()
    const sWuParameterzzStore = useWuParameterzzStore()

    const [parameterzz, setParameterzz] = useState<LB.WuParameter[]>([])

    useEffect(() => {
        setParameterzz(
            sWuParameterzzStore.itemzz.filter((item) => item.wuId === property.item.id),
        )
    }, [property.item, sWuParameterzzStore.itemzz])

    return (
        <table className="table">
            <caption>
                <h3 className="inline">WuParameter</h3>
                <span
                    onClick={() => {
                        showNameInput("Please input the WuParameter name", "")
                            .then((response) => {
                                if (response.isConfirmed) {
                                    if (response.value) {
                                        return makeWuParameterCRUD().create(
                                            makeWuParameter(
                                                property.item.id,
                                                response.value,
                                            ),
                                        )
                                    }
                                }
                            })
                            .catch(sToastzzStore.showError)
                    }}
                    className="btn btn-outline-primary mx-1"
                >
                    +
                </span>
            </caption>
            <thead>
                <tr>
                    <td>name</td>
                    <td>isWu</td>
                    <td>description</td>
                </tr>
            </thead>
            <tbody>
                {parameterzz.map((item) => (
                    <WuParameter key={item.id} item={item}></WuParameter>
                ))}
            </tbody>
        </table>
    )
}
