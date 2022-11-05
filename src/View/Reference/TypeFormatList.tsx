import makeTypeFormat from "@/Database/Factory/makeTypeFormat"
import useWuParameterzzStore from "@/Store/useWuParameterzzStore"
import { useState, useEffect } from "react"
import TypeFormat from "./TypeFormat"

interface Property {
    itemzz: LB.TypeFormat[]
    targetId: number
    wuId?: number
    updateArgumentzz(argumentzz: LB.TypeFormat[]): void
}

export default function TypeFormatList(property: Property) {
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
            {parameterzz.map((item, index) => (
                <div key={item.id} className="d-flex mb-1">
                    <div className="text-secondary mt-1 me-1">{item.name}</div>
                    {property.itemzz[index] ? (
                        <TypeFormat
                            id={item.id}
                            item={property.itemzz[index]}
                            wuId={property.wuId}
                            update={function (data) {
                                const argumentzz = [...property.itemzz]
                                argumentzz[index] = data
                                property.updateArgumentzz(argumentzz)
                            }}
                        ></TypeFormat>
                    ) : null}
                </div>
            ))}
            {property.itemzz.length < parameterzz.length ? (
                <div>
                    <button
                        className="btn btn-outline-primary"
                        type="button"
                        onClick={function () {
                            const argumentzz = [...property.itemzz, makeTypeFormat()]
                            property.updateArgumentzz(argumentzz)
                        }}
                    >
                        +
                    </button>
                </div>
            ) : null}
            &gt;
        </div>
    )
}
