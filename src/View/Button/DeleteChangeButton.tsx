import useToastzzStore from "@/Store/useToastzzStore"
import { ReactElement } from "react"
import showConfirm from "../Dialog/showConfirm"

interface Property {
    canChange?: boolean
    canDelete?: boolean
    children?: ReactElement
    className?: string
    name: string
    onChange(): void
    onDelete(isConfirmed: boolean): void
}

export default function DeleteChangeButton(property: Property) {
    const sToastzzStore = useToastzzStore()

    return (
        <div className={"btn-group " + (property.className ?? "")}>
            <button
                disabled={property.canDelete === false}
                onClick={function () {
                    showConfirm()
                        .then((response) => property.onDelete(response.isConfirmed))
                        .catch(sToastzzStore.showError)
                }}
                className="btn btn-outline-primary danger"
                type="button"
            >
                -
            </button>
            <button
                disabled={property.canChange === false}
                onClick={property.onChange}
                className="btn btn-outline-primary"
                type="button"
            >
                {property.name}
            </button>

            {property.children}
        </div>
    )
}
