import getCollectionItemzz from "@/Service/getCollectionItemzz"
import makeNotFoundText from "@/Factory/makeNotFoundText"
import useTypeFormatzzStore from "@/Store/useTypeFormatzzStore"
import { ReactElement } from "react"
import ColorButtonGroup from "../Button/ColorButtonGroup"
import SelectButton from "../Button/SelectButton"
import TypeFormat from "../Reference/TypeFormat"
import ExampleList from "./ExampleList"

interface Property {
    caption?: ReactElement
    children?: ReactElement
    isRequest: boolean
    item: LB.Response
    update(item: any): void
}

export default function MediaType(property: Property) {
    const sTypeFormatzzStore = useTypeFormatzzStore()

    const itemzz = getCollectionItemzz("MediaType")
    const mti = itemzz.find((item) => item.name === property.item.mediaType)?.id ?? 0

    const tf = sTypeFormatzzStore.itemzz.find(
        (item) =>
            (property.isRequest ? item.ownerRequestId : item.ownerResponseId) ===
            property.item.id,
    )
    if (tf === undefined) {
        return <div>{makeNotFoundText("TypeFormat", "")}</div>
    }

    return (
        <table className="table td0-tar">
            {property.caption}
            <tbody>
                <tr>
                    <td>color</td>
                    <td>
                        <ColorButtonGroup
                            color={property.item.color}
                            setColor={(color) =>
                                property.update({
                                    ...property.item,
                                    color,
                                })
                            }
                        ></ColorButtonGroup>
                    </td>
                </tr>
                {property.children}
                <tr>
                    <td className="w111">MediaType</td>
                    <td>
                        <SelectButton
                            className="wa"
                            itemzz={itemzz}
                            value={mti}
                            change={function (id, item) {
                                property.update({
                                    ...property.item,
                                    mediaType: item?.name ?? "",
                                })
                            }}
                        ></SelectButton>
                    </td>
                </tr>
                <tr>
                    <td>content</td>
                    <td>
                        <TypeFormat id={property.item.id} item={tf}></TypeFormat>
                    </td>
                </tr>
                <tr>
                    <td>examples</td>
                    <td>
                        <ExampleList
                            requestId={property.isRequest ? property.item.id : null}
                            responseId={property.isRequest ? null : property.item.id}
                        ></ExampleList>
                    </td>
                </tr>
                <tr>
                    <td>example</td>
                    <td>
                        <textarea
                            rows={3}
                            value={property.item.example}
                            onChange={(event) =>
                                property.update({
                                    ...property.item,
                                    example: event.target.value,
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
