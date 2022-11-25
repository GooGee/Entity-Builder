import { OapiType } from "@/Model/Oapi"
import useWuParameterzzStore from "@/Store/useWuParameterzzStore"
import { useState, useEffect } from "react"
import TypeFormat from "./TypeFormat"

interface Property {
    itemzz: LB.TypeFormat[]
    targetId: number
    wuId?: number
    updateArgumentzz(argumentzz: LB.TypeFormat[]): void
}

export default function ArgumentList(property: Property) {
    const sWuParameterzzStore = useWuParameterzzStore()
    const [parameterzz, setParameterzz] = useState<LB.WuParameter[]>([])

    useEffect(() => {
        setParameterzz(
            sWuParameterzzStore.itemzz.filter(
                (item) => item.wuId === property.targetId,
            ),
        )
    }, [property.targetId])

    if (parameterzz.length === 0) {
        return null
    }

    return (
        <div>
            &lt;
            {parameterzz.map((item, index) => {
                const tf = property.itemzz[index]

                if (tf === undefined) {
                    return (
                        <span className="text-danger">
                            argument {item.name} is missing
                        </span>
                    )
                }

                return (
                    <div key={item.id} className="d-flex mt-1">
                        <div className="text-secondary mt-2 me-1">
                            {item.name}
                            {item.isWu && tf.type !== OapiType.Wu ? (
                                <span className="text-danger ms-1">must be Wu</span>
                            ) : null}
                        </div>

                        <TypeFormat
                            id={item.id}
                            item={tf}
                            wuId={property.wuId}
                            update={function (data) {
                                const argumentzz = [...property.itemzz]
                                argumentzz[index] = data
                                property.updateArgumentzz(argumentzz)
                            }}
                        ></TypeFormat>
                    </div>
                )
            })}
            &gt;
        </div>
    )
}
