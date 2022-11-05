import makeTypeFormat from "@/Database/Factory/makeTypeFormat"
import useWuParameterzzStore from "@/Store/useWuParameterzzStore"
import { useState, useEffect } from "react"
import TypeFormatText from "./TypeFormatText"

interface Property {
    itemzz: LB.TypeFormat[]
    targetId: number
    wuId?: number
    updateArgumentzz(argumentzz: LB.TypeFormat[]): void
}

export default function TypeFormatTextList(property: Property) {
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
        <span>
            &lt;
            {property.itemzz.map((item, index) => (
                <div key={index} className="mb-1">
                    <TypeFormatText
                        id={index}
                        item={item}
                        wuId={property.wuId}
                        update={function (item) {
                            const argumentzz = [...property.itemzz]
                            argumentzz[index] = item
                            property.updateArgumentzz(argumentzz)
                        }}
                    ></TypeFormatText>
                </div>
            ))}
            {property.itemzz.length < parameterzz.length ? (
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
            ) : null}
            &gt;
        </span>
    )
}
