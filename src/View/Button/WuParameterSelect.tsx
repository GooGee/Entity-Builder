import { OapiType } from "@/Model/Oapi"
import useWuParameterzzStore from "@/Store/useWuParameterzzStore"
import { useEffect, useState } from "react"
import SelectButton from "./SelectButton"

interface Property {
    wuId: number
    isWu?: boolean
    add(found: LB.WuParameter): void
}

export default function WuParameterSelect(property: Property) {
    const sWuParameterzzStore = useWuParameterzzStore()

    const [parameterzz, setParameterzz] = useState<LB.WuParameter[]>([])

    useEffect(() => {
        setParameterzz(
            sWuParameterzzStore.itemzz.filter(function (item) {
                if (item.wuId === property.wuId) {
                    if (property.isWu) {
                        return item.isWu
                    }
                    return true
                }
                return false
            }),
        )
    }, [property.wuId, sWuParameterzzStore.itemzz])

    return (
        <SelectButton
            className="inline wa"
            itemzz={parameterzz}
            value={0}
            verb={OapiType.WuParameter}
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
