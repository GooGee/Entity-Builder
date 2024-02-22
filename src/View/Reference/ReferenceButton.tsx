import { OapiType } from "@/Model/Oapi"
import ReferenceEnum from "./ReferenceEnum"
import ReferenceParameter from "./ReferenceParameter"
import ReferenceWu from "./ReferenceWu"

interface Property {
    item: LB.TypeFormat
    wuId?: number
    update(item: LB.TypeFormat): Promise<any>
}

export default function ReferenceButton(property: Property) {
    if (property.item.type === OapiType.Enum) {
        return <ReferenceEnum item={property.item} update={property.update}></ReferenceEnum>
    }

    if (property.item.type === OapiType.WuParameter) {
        if (property.wuId === undefined) {
            return <span className="text-danger">only available in Wu page</span>
        }

        return (
            <ReferenceParameter item={property.item} wuId={property.wuId} update={property.update}></ReferenceParameter>
        )
    }

    return <ReferenceWu item={property.item} wuId={property.wuId} update={property.update}></ReferenceWu>
}
