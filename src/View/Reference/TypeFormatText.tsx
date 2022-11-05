import { isPrimary } from "@/Model/Oapi"
import makeTextTypeFormat, {
    clearError,
    errorTypeFormat,
} from "@/Service/Oapi/makeTextTypeFormat"
import useTypeFormatModalStore from "@/Store/useTypeFormatModalStore"
import useVariablezzStore from "@/Store/useVariablezzStore"
import useWuParameterzzStore from "@/Store/useWuParameterzzStore"
import useWuzzStore from "@/Store/useWuzzStore"
import TypeFormat from "./TypeFormat"

interface Property {
    id: number | string
    item: LB.TypeFormat
    wuId?: number
    update(item: LB.TypeFormat): void
}

export default function TypeFormatText(property: Property) {
    const sTypeFormatModalStore = useTypeFormatModalStore()
    const sVariablezzStore = useVariablezzStore()
    const sWuParameterzzStore = useWuParameterzzStore()
    const sWuzzStore = useWuzzStore()

    if (isPrimary(property.item.type)) {
        return (
            <TypeFormat
                id={property.id}
                item={property.item}
                update={property.update}
                wuId={property.wuId}
            ></TypeFormat>
        )
    }

    clearError()
    const text = makeTextTypeFormat(
        property.item,
        sVariablezzStore,
        sWuParameterzzStore,
        sWuzzStore,
    )
    let index = text.indexOf("<")
    if (index === -1) {
        index = text.length
    }
    return (
        <span>
            <button
                className={
                    "btn btn-outline-" + (errorTypeFormat ? "danger" : "primary")
                }
                type="button"
                onClick={function () {
                    sTypeFormatModalStore.show(
                        property.item,
                        property.update,
                        property.wuId,
                    )
                }}
            >
                {text.slice(0, index)}
            </button>
            {text.slice(index)}
        </span>
    )
}
