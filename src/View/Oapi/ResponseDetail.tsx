import { ReactElement } from "react"
import MediaType from "./MediaType"
import ParameterList from "./ParameterList"

interface Property {
    caption?: ReactElement
    item: LB.Response
    update(data: LB.Response): void
}

export default function ResponseDetail(property: Property) {
    return (
        <MediaType caption={property.caption} item={property.item} isRequest={false} update={property.update}>
            <tr>
                <td>header</td>
                <td>
                    <ParameterList responseId={property.item.id}></ParameterList>
                </td>
            </tr>
        </MediaType>
    )
}
