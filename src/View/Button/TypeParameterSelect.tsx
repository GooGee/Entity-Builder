import { OapiType } from "@/Model/Oapi"
import useWuParameterzzStore from "@/Store/useWuParameterzzStore"
import { useEffect, useState } from "react"
import SelectButton from "./SelectButton"

interface Property {
    wuId: number
    add(found: LB.WuParameter): void
}

export default function TypeParameterSelect(property: Property) {
    const sWuParameterzzStore = useWuParameterzzStore()

    const [parameterzz, setParameterzz] = useState<LB.WuParameter[]>([])

    useEffect(() => {
        setParameterzz(
            sWuParameterzzStore.itemzz.filter((item) => item.wuId === property.wuId),
        )
    }, [property.wuId, sWuParameterzzStore.itemzz])

    return (
        <SelectButton
            className="inline wa"
            itemzz={parameterzz}
            value={0}
            verb={OapiType.TypeParameter}
            change={(value) => {
                const found = sWuParameterzzStore.find(value)
                if (found === undefined) {
                    return
                }
                property.add(found)
            }}
        ></SelectButton>
    )
}
