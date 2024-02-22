import { OapiType } from "@/Model/Oapi"
import useTypeFormatzzStore from "@/Store/useTypeFormatzzStore"
import useWuParameterzzStore from "@/Store/useWuParameterzzStore"
import { useState, useEffect } from "react"
import TypeFormat from "./TypeFormat"

interface Property {
    item: LB.TypeFormat
    wuId?: number
}

export default function ArgumentList(property: Property) {
    const sTypeFormatzzStore = useTypeFormatzzStore()
    const sWuParameterzzStore = useWuParameterzzStore()

    const [parameterzz, setParameterzz] = useState<LB.WuParameter[]>([])
    const [tfzz, setTfzz] = useState<LB.TypeFormat[]>([])

    useEffect(() => {
        setParameterzz(sWuParameterzzStore.itemzz.filter((item) => item.wuId === property.item.wuId))
        setTfzz(sTypeFormatzzStore.itemzz.filter((item) => item.ownerId === property.item.id))
    }, [property.item, sTypeFormatzzStore.itemzz])

    if (parameterzz.length === 0) {
        return null
    }

    return (
        <div>
            &lt;
            {parameterzz.map((item, index) => {
                const tf = tfzz[index]

                if (tf === undefined) {
                    return (
                        <span key={item.id} className="text-danger">
                            argument {item.name} is missing
                        </span>
                    )
                }

                return (
                    <div key={item.id} className="mt-1">
                        <TypeFormat id={item.id} item={tf} wuId={property.wuId}>
                            <div className="text-secondary me-2">
                                {item.name}
                                {item.isWu && tf.type !== OapiType.Wu ? (
                                    <span className="text-danger ms-1">must be Wu</span>
                                ) : null}
                            </div>
                        </TypeFormat>
                    </div>
                )
            })}
            &gt;
        </div>
    )
}
