import useWuParameterzzStore from "@/Store/useWuParameterzzStore"
import { useState, useEffect } from "react"
import SelectButton from "../Button/SelectButton"

interface Property {
    item: LB.TypeFormat
    wuId: number
    update(item: LB.TypeFormat): void
}

export default function ReferenceParameter(property: Property) {
    const sWuParameterzzStore = useWuParameterzzStore()

    const [tpzz, setTpzz] = useState<LB.WuParameter[]>([])

    useEffect(() => {
        setTpzz(
            sWuParameterzzStore.itemzz.filter((item) => item.wuId === property.wuId),
        )
    }, [property.wuId])

    return (
        <SelectButton
            className="wa inline"
            itemzz={tpzz}
            value={property.item.wuParameterId ?? 0}
            change={function (wuParameterId) {
                property.update({
                    ...property.item,
                    wuParameterId,
                })
            }}
        ></SelectButton>
    )
}
