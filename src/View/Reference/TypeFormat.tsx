import { makeTypeFormatCRUD } from "@/Database/makeCRUD"
import { isReference, OapiType, OapiTypezz } from "@/Model/Oapi"
import deleteTypeFormatArgument from "@/Service/deleteTypeFormatArgument"
import getCollectionItemzz from "@/Service/getCollectionItemzz"
import useToastzzStore from "@/Store/useToastzzStore"
import { ReactElement } from "react"
import SelectStringButton from "../Button/SelectStringButton"
import ReferenceButton from "./ReferenceButton"
import makeNotFoundText from "@/Factory/makeNotFoundText"

interface Property {
    children?: ReactElement
    id: number | string // used for HTML Label (switch)
    item?: LB.TypeFormat
    wuId?: number
}

interface Property2 extends Property {
    item: LB.TypeFormat
}

export default function TypeFormat(property2: Property) {
    const sToastzzStore = useToastzzStore()

    if (property2.item === undefined) {
        return <span className="text-danger">{makeNotFoundText("TypeFormat", "")}</span>
    }

    const property = property2 as Property2

    if (property.wuId === undefined && property.item.type === OapiType.WuParameter) {
        return <span className="text-danger">WuParameter is only available in Wu page</span>
    }

    function getTypezz() {
        if (property.wuId) {
            return OapiTypezz
        }

        return OapiTypezz.filter((item) => item !== OapiType.WuParameter)
    }

    function makeFormat() {
        if ([OapiType.any, OapiType.boolean].includes(property.item.type)) {
            return null
        }

        if (isReference(property.item.type)) {
            return <ReferenceButton item={property.item} wuId={property.wuId} update={update}></ReferenceButton>
        }

        const formatzz = getCollectionItemzz("TypeFormat").map((item) => item.name)

        return (
            <div>
                <SelectStringButton
                    allowEmpty
                    className="wa"
                    itemzz={formatzz}
                    value={property.item.format}
                    change={(format) =>
                        update({
                            ...property.item,
                            format,
                        })
                    }
                ></SelectStringButton>
            </div>
        )
    }

    function update(data: LB.TypeFormat) {
        return makeTypeFormatCRUD().update(data).catch(sToastzzStore.showError)
    }

    function updateType(type: OapiType) {
        if (type === property.item.type) {
            return
        }

        const data = {
            ...property.item,
            type,
        }
        const old = property.item.type
        if (old === OapiType.Wu) {
            data.wuId = 1
        }
        if (old === OapiType.WuParameter) {
            data.wuParameterId = null
        }
        if (old === OapiType.Enum) {
            data.variableId = null
        }
        return update(data)
            .then(function () {
                if (old === OapiType.Wu) {
                    return deleteTypeFormatArgument(property.item.id)
                }
            })
            .catch(sToastzzStore.showError)
    }

    return (
        <div>
            <div className="d-flex mt-2">
                <div>{property.children}</div>

                <div>
                    <div className="form-check form-switch">
                        <input
                            checked={property.item.isArray}
                            onChange={(event) =>
                                update({
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
                            <label className="form-check-label" htmlFor={"isArraySwitchCheck" + property.id}>
                                array
                            </label>
                        ) : null}
                    </div>
                </div>

                <div>
                    <div className="form-check form-switch ms-2">
                        <input
                            checked={property.item.nullable}
                            onChange={(event) =>
                                update({
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
                            <label className="form-check-label" htmlFor={"nullableSwitchCheck" + property.id}>
                                nullable
                            </label>
                        ) : null}
                    </div>
                </div>
            </div>

            <div className="d-flex mt-2">
                <div>
                    <SelectStringButton
                        className="wa me-1"
                        itemzz={getTypezz()}
                        value={property.item.type}
                        change={updateType}
                    ></SelectStringButton>
                </div>

                <div>{makeFormat()}</div>
            </div>
        </div>
    )
}
