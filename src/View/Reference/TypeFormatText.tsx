import makeTextTypeFormat, { clearError } from "@/Service/Oapi/makeTextTypeFormat"
import useTypeFormatzzStore from "@/Store/useTypeFormatzzStore"
import useVariablezzStore from "@/Store/useVariablezzStore"
import useWuParameterzzStore from "@/Store/useWuParameterzzStore"
import useWuzzStore from "@/Store/useWuzzStore"
import { useState } from "react"
import TypeFormat from "./TypeFormat"

interface Property {
    id: number | string
    isRoot?: boolean
    item: LB.TypeFormat
    wuId?: number
}

export default function TypeFormatText(property: Property) {
    const sTypeFormatzzStore = useTypeFormatzzStore()
    const sVariablezzStore = useVariablezzStore()
    const sWuParameterzzStore = useWuParameterzzStore()
    const sWuzzStore = useWuzzStore()

    const [visible, setVisible] = useState(false)

    if (visible) {
        return (
            <div>
                <div>
                    <button
                        className="btn btn-outline-primary"
                        type="button"
                        onClick={() => setVisible(false)}
                    >
                        OK
                    </button>
                </div>
                <TypeFormat
                    id={property.id}
                    item={property.item}
                    wuId={property.wuId}
                ></TypeFormat>
            </div>
        )
    }

    clearError()
    const text = makeTextTypeFormat(
        property.item,
        sTypeFormatzzStore.itemzz,
        sVariablezzStore.itemzz,
        sWuParameterzzStore.itemzz,
        sWuzzStore.itemzz,
    )
    let index = text.indexOf("<")
    if (index === -1) {
        index = text.length
    }
    return (
        <span
            className={property.isRoot ? "pointer" : ""}
            onClick={() => (property.isRoot ? setVisible(true) : null)}
        >
            {text.slice(0, index)}
            {text.slice(index)}
        </span>
    )
}
