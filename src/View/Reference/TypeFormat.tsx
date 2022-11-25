import makeTypeFormat from "@/Database/Factory/makeTypeFormat"
import { Formatzz, isReference, OapiType, OapiTypezz } from "@/Model/Oapi"
import SelectStringButton from "../Button/SelectStringButton"
import ReferenceButton from "./ReferenceButton"

interface Property {
    id: number | string // used for HTML Label (switch)
    item: LB.TypeFormat
    wuId?: number
    update(item: LB.TypeFormat): void
}

export default function TypeFormat(property: Property) {
    if (property.wuId === undefined && property.item.type === OapiType.TypeParameter) {
        return (
            <span className="text-danger">
                TypeParameter is only available in Wu page
            </span>
        )
    }

    function getTypezz() {
        if (property.wuId) {
            return OapiTypezz
        }

        const typezz = [...OapiTypezz]
        const index = typezz.indexOf(OapiType.TypeParameter)
        typezz.splice(index, 1)
        return typezz
    }

    function makeFormat() {
        if ([OapiType.any, OapiType.boolean].includes(property.item.type)) {
            return null
        }

        if (isReference(property.item.type)) {
            return (
                <ReferenceButton
                    item={property.item}
                    wuId={property.wuId}
                    update={function (tf) {
                        property.update(tf)
                    }}
                ></ReferenceButton>
            )
        }

        return (
            <div>
                <SelectStringButton
                    className="wa"
                    itemzz={Formatzz}
                    value={property.item.format}
                    change={(format) =>
                        property.update({
                            ...property.item,
                            format,
                        })
                    }
                ></SelectStringButton>
            </div>
        )
    }

    return (
        <div className="d-flex">
            <div className="mt-2">
                <div className="form-check form-switch">
                    <input
                        checked={property.item.isArray}
                        onChange={(event) =>
                            property.update({
                                ...property.item,
                                isArray: event.target.checked,
                            })
                        }
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id={"isArraySwitchCheck" + property.id}
                    />
                    {property.item.isArray ? (
                        <label
                            className="form-check-label"
                            htmlFor={"isArraySwitchCheck" + property.id}
                        >
                            array
                        </label>
                    ) : null}
                </div>
            </div>
            <div className="mt-2">
                <div className="form-check form-switch ms-2">
                    <input
                        checked={property.item.nullable}
                        onChange={(event) =>
                            property.update({
                                ...property.item,
                                nullable: event.target.checked,
                            })
                        }
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id={"nullableSwitchCheck" + property.id}
                    />
                    {property.item.nullable ? (
                        <label
                            className="form-check-label"
                            htmlFor={"nullableSwitchCheck" + property.id}
                        >
                            nullable
                        </label>
                    ) : null}
                </div>
            </div>

            <div>
                <SelectStringButton
                    className="wa ms-2 me-1"
                    itemzz={getTypezz()}
                    value={property.item.type}
                    change={function (type: OapiType) {
                        if (type === property.item.type) {
                            return
                        }

                        property.update(makeTypeFormat(type))
                    }}
                ></SelectStringButton>
            </div>

            {makeFormat()}
        </div>
    )
}
