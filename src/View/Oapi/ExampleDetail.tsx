import { makeExampleCRUD } from "@/Database/makeCRUD"
import useExamplePageStore from "@/Store/useExamplePageStore"
import useToastzzStore from "@/Store/useToastzzStore"
import ColorButtonGroup from "../Button/ColorButtonGroup"

interface Property {
    item: LB.Example
}

export default function ExampleDetail(property: Property) {
    const sExamplePageStore = useExamplePageStore()
    const sToastzzStore = useToastzzStore()

    function update(item: LB.Example) {
        sExamplePageStore.setItem(item)
        makeExampleCRUD()
            .update(item)
            .then((response) => sExamplePageStore.setItem(response))
            .catch(sToastzzStore.showError)
    }

    return (
        <table className="table table-text-right">
            <tbody>
                <tr>
                    <td>color</td>
                    <td>
                        <ColorButtonGroup
                            color={property.item.color}
                            setColor={(color) =>
                                update({
                                    ...property.item,
                                    color,
                                })
                            }
                        ></ColorButtonGroup>
                    </td>
                </tr>
                <tr>
                    <td>summary</td>
                    <td>
                        <input
                            value={property.item.summary}
                            onChange={(event) =>
                                update({
                                    ...property.item!,
                                    summary: event.target.value,
                                })
                            }
                            className="form-control"
                            type="text"
                        />
                    </td>
                </tr>
                <tr>
                    <td>value</td>
                    <td>
                        <textarea
                            rows={11}
                            value={property.item.value}
                            onChange={(event) =>
                                update({
                                    ...property.item!,
                                    value: event.target.value,
                                })
                            }
                            className="form-control"
                        ></textarea>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
