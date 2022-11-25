import { makeParameterCRUD } from "@/Database/makeCRUD"
import { ParameterLocationzz } from "@/Model/Oapi"
import useParameterPageStore from "@/Store/useParameterPageStore"
import useToastzzStore from "@/Store/useToastzzStore"
import ColorButtonGroup from "../Button/ColorButtonGroup"
import SelectStringButton from "../Button/SelectStringButton"
import WebLink from "../Button/WebLink"
import showInput from "../Dialog/showInput"
import TypeFormat from "../Reference/TypeFormat"
import ConstraintList from "../Schema/ConstraintList"

interface Property {
    constraintzz: LB.CollectionItem[]
    isHeader: boolean
    item: LB.Parameter
}

export default function ParameterDetail(property: Property) {
    const sParameterPageStore = useParameterPageStore()
    const sToastzzStore = useToastzzStore()

    function update(data: LB.Parameter) {
        sParameterPageStore.setItem(data)
        makeParameterCRUD()
            .update(data)
            .then(sParameterPageStore.setItem)
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
                                    ...property.item!,
                                    color,
                                })
                            }
                        ></ColorButtonGroup>
                    </td>
                </tr>
                {property.isHeader ? null : (
                    <tr>
                        <td>name2</td>
                        <td>
                            <button
                                onClick={function () {
                                    showInput(
                                        "Please input the Parameter name",
                                        property.item!.name2,
                                    )
                                        .then((response) => {
                                            if (response.isConfirmed) {
                                                update({
                                                    ...property.item!,
                                                    name2: response.value,
                                                })
                                            }
                                        })
                                        .catch(sToastzzStore.showError)
                                }}
                                className="btn btn-outline-primary"
                                type="button"
                            >
                                {property.item.name2}
                            </button>
                        </td>
                    </tr>
                )}
                {property.isHeader ? null : (
                    <tr>
                        <td>in</td>
                        <td>
                            <SelectStringButton
                                className="wa"
                                itemzz={ParameterLocationzz}
                                value={property.item.in}
                                change={function (value) {
                                    update({
                                        ...property.item!,
                                        in: value,
                                    })
                                }}
                            ></SelectStringButton>
                        </td>
                    </tr>
                )}
                <tr>
                    <td>type</td>
                    <td>
                        <TypeFormat
                            id={property.item.id}
                            item={property.item.tf}
                            update={function (tf) {
                                update({
                                    ...property.item!,
                                    tf,
                                })
                            }}
                        ></TypeFormat>
                    </td>
                </tr>
                <tr>
                    <td>allowEmptyValue</td>
                    <td>
                        <div className="form-check form-switch">
                            <input
                                checked={property.item.allowEmptyValue}
                                onChange={(event) =>
                                    update({
                                        ...property.item!,
                                        allowEmptyValue: event.target.checked,
                                    })
                                }
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id={"allowEmptyValueSwitchCheck" + property.item.id}
                            />
                            <label
                                className="form-check-label"
                                htmlFor={
                                    "allowEmptyValueSwitchCheck" + property.item.id
                                }
                            ></label>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>allowReserved</td>
                    <td>
                        <div className="form-check form-switch">
                            <input
                                checked={property.item.allowReserved}
                                onChange={(event) =>
                                    update({
                                        ...property.item!,
                                        allowReserved: event.target.checked,
                                    })
                                }
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id={"allowReservedSwitchCheck" + property.item.id}
                            />
                            <label
                                className="form-check-label"
                                htmlFor={"allowReservedSwitchCheck" + property.item.id}
                            ></label>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>deprecated</td>
                    <td>
                        <div className="form-check form-switch">
                            <input
                                checked={property.item.deprecated}
                                onChange={(event) =>
                                    update({
                                        ...property.item!,
                                        deprecated: event.target.checked,
                                    })
                                }
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id={"deprecatedSwitchCheck" + property.item.id}
                            />
                            <label
                                className="form-check-label"
                                htmlFor={"deprecatedSwitchCheck" + property.item.id}
                            ></label>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>explode</td>
                    <td>
                        <div className="form-check form-switch">
                            <input
                                checked={property.item.explode}
                                onChange={(event) =>
                                    update({
                                        ...property.item!,
                                        explode: event.target.checked,
                                    })
                                }
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id={"explodeSwitchCheck" + property.item.id}
                            />
                            <label
                                className="form-check-label"
                                htmlFor={"explodeSwitchCheck" + property.item.id}
                            ></label>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>required</td>
                    <td>
                        <div className="form-check form-switch">
                            <input
                                checked={property.item.required}
                                onChange={(event) =>
                                    update({
                                        ...property.item!,
                                        required: event.target.checked,
                                    })
                                }
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id={"requiredSwitchCheck" + property.item.id}
                            />
                            <label
                                className="form-check-label"
                                htmlFor={"requiredSwitchCheck" + property.item.id}
                            ></label>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>constraint</span>
                        <br />
                        <WebLink href="https://laravel.com/docs/9.x/validation">
                            doc
                        </WebLink>
                    </td>
                    <td>
                        <ConstraintList
                            constraintzz={property.constraintzz}
                            item={property.item}
                            update={function (constraintzz) {
                                update({
                                    ...property.item,
                                    constraintzz,
                                })
                            }}
                        ></ConstraintList>
                    </td>
                </tr>
                <tr>
                    <td>example</td>
                    <td>
                        <textarea
                            value={property.item.example}
                            onChange={(event) =>
                                update({
                                    ...property.item!,
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
