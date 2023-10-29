import useToastzzStore from "@/Store/useToastzzStore"
import showInput from "../Dialog/showInput"

interface Property {
    item: LB.Variable
    update(item: LB.Variable): void
}

export default function VariableValueList(property: Property) {
    const sToastzzStore = useToastzzStore()

    return (
        <ul className="list-unstyled">
            <li className="mb-1">
                <button
                    className="btn btn-outline-primary"
                    type="button"
                    onClick={function () {
                        showInput("Please input a value", "")
                            .then((response) => {
                                if (response.isConfirmed) {
                                    if (response.value) {
                                        if (
                                            property.item.enum.includes(response.value)
                                        ) {
                                            sToastzzStore.showDanger(
                                                `${response.value} exists`,
                                            )
                                            return
                                        }

                                        const zz = [...property.item.enum]
                                        zz.push(response.value)
                                        zz.sort()
                                        property.update({
                                            ...property.item,
                                            enum: zz,
                                        })
                                    }
                                }
                            })
                            .catch(sToastzzStore.showError)
                    }}
                >
                    +
                </button>
            </li>

            {property.item.enum.map((item) => (
                <li key={item} className="mb-1">
                    <button
                        className="btn btn-outline-danger"
                        type="button"
                        onClick={function () {
                            const zz = [...property.item.enum]
                            const index = zz.indexOf(item)
                            if (index === -1) {
                                return
                            }
                            zz.splice(index, 1)
                            property.update({
                                ...property.item,
                                enum: zz,
                            })
                        }}
                    >
                        - {item}
                    </button>
                </li>
            ))}
        </ul>
    )
}
