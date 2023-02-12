import { makeWuCRUD } from "@/Database/makeCRUD"
import makeNotFoundText from "@/Factory/makeNotFoundText"
import useToastzzStore from "@/Store/useToastzzStore"
import useTypeFormatzzStore from "@/Store/useTypeFormatzzStore"
import useWuPageStore from "@/Store/useWuPageStore"
import ColorButtonGroup from "../Button/ColorButtonGroup"
import WebLink from "../Button/WebLink"
import TypeFormat from "../Reference/TypeFormat"

interface Property {
    item: LB.Wu
}

export default function MapDetail(property: Property) {
    const sToastzzStore = useToastzzStore()
    const sTypeFormatzzStore = useTypeFormatzzStore()
    const sWuPageStore = useWuPageStore()

    const tf = sTypeFormatzzStore.itemzz.find(
        (item) => item.ownerWuId === property.item.id,
    )
    if (tf === undefined) {
        return <div>{makeNotFoundText("TypeFormat", "")}</div>
    }

    function update(item: LB.Wu) {
        sWuPageStore.setItem(item)
        makeWuCRUD()
            .update(item)
            .then((response) => sWuPageStore.setItem(response))
            .catch(sToastzzStore.showError)
    }

    return (
        <table className="table td0-tar">
            <caption>
                <h3 className="inline me-3">Map</h3>
                <div className="form-check form-switch inline">
                    <input
                        checked={property.item.isMap}
                        onChange={function (event) {
                            update({
                                ...property.item,
                                isMap: event.target.checked,
                            })
                        }}
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="isMapSwitchCheck"
                    />
                    <label className="form-check-label" htmlFor="isMapSwitchCheck">
                        isMap
                    </label>
                </div>

                <WebLink
                    className="ms-3"
                    href="https://spec.openapis.org/oas/v3.0.3#model-with-map-dictionary-properties"
                >
                    doc
                </WebLink>
            </caption>
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
                    <td></td>
                    <td>Map&lt;string, value type&gt;</td>
                </tr>
                <tr>
                    <td>value type</td>
                    <td>
                        <TypeFormat
                            id={property.item.id}
                            item={tf}
                            wuId={property.item.id}
                        ></TypeFormat>
                    </td>
                </tr>
                <tr>
                    <td>example</td>
                    <td>
                        <textarea
                            value={property.item.example}
                            onChange={(event) =>
                                update({
                                    ...property.item,
                                    example: event.target.value,
                                })
                            }
                            className="form-control"
                            rows={3}
                        ></textarea>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
