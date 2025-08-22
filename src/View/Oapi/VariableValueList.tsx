import useToastzzStore from "@/Store/useToastzzStore"
import showInput from "../Dialog/showInput"
import useImportModalStore from "@/Store/useImportModalStore"

const Example = `e.g.
200
401
404
500

or

    case Day = 'Day';
    case Month = 'Month';
    case Week = 'Week';
`

function getValue(text: string) {
    const match = text.match(/=\s*(.+);.*$/)
    if (match) {
        return trimText(match[1])
    }
    return trimText(text)
}

function trimText(text: string) {
    return text.trim().replace(/^['"]+|['"]+$/g, "")
}

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
                                        if (property.item.enum.includes(response.value)) {
                                            sToastzzStore.showDanger(`${response.value} exists`)
                                            return
                                        }

                                        const zz = [...property.item.enum, response.value]
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

                <button
                    className="btn btn-outline-primary ms-3"
                    type="button"
                    onClick={function () {
                        const ss = useImportModalStore.getState()
                        ss.openCB(1, "import values", Example, function (text) {
                            const linezz = text.split(/\r?\n/)
                            if (linezz.length === 0) {
                                ss.close()
                                return
                            }

                            const set = new Set<string>(property.item.enum)
                            linezz.forEach((item) => {
                                const value = getValue(item)
                                if (value === "") {
                                    return
                                }
                                set.add(value)
                            })
                            const zz = Array.from(set).sort()
                            property.update({
                                ...property.item,
                                enum: zz,
                            })

                            ss.close()
                        })
                    }}
                >
                    import
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
