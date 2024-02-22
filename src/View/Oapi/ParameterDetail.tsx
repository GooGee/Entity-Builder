import { makeColumnCRUD } from "@/Database/makeCRUD"
import { ParameterStylezz } from "@/Model/Oapi"
import makeNotFoundText from "@/Factory/makeNotFoundText"
import useParameterPageStore from "@/Store/useParameterPageStore"
import useToastzzStore from "@/Store/useToastzzStore"
import useTypeFormatzzStore from "@/Store/useTypeFormatzzStore"
import SelectStringButton from "../Button/SelectStringButton"
import WebLink from "../Button/WebLink"
import ConstraintList from "../Entity/ConstraintList"
import TypeFormat from "../Reference/TypeFormat"

interface Property {
    constraintzz: LB.CollectionItem[]
    item: LB.Column
}

export default function ParameterDetail(property: Property) {
    const sParameterPageStore = useParameterPageStore()
    const sToastzzStore = useToastzzStore()
    const sTypeFormatzzStore = useTypeFormatzzStore()

    const tf = sTypeFormatzzStore.itemzz.find((item) => item.ownerColumnId === property.item.id)

    function update(data: LB.Column) {
        sParameterPageStore.setItem(data)
        makeColumnCRUD().update(data).then(sParameterPageStore.setItem).catch(sToastzzStore.showError)
    }

    return (
        <table className="table td0-tar">
            <tbody>
                <tr>
                    <td className="w111">type</td>
                    <td>
                        <TypeFormat id={property.item.id} item={tf}></TypeFormat>
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
                            <label className="form-check-label" htmlFor={"explodeSwitchCheck" + property.item.id}></label>
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
                    <td>style</td>
                    <td>
                        <SelectStringButton
                            className="wa"
                            itemzz={ParameterStylezz}
                            value={property.item.style}
                            change={function (id) {
                                update({
                                    ...property.item,
                                    style: id,
                                })
                            }}
                        ></SelectStringButton>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>constraint</span>
                        <br />
                        <WebLink href="https://laravel.com/docs/9.x/validation">doc</WebLink>
                    </td>
                    <td>
                        <ConstraintList column={property.item} constraintzz={property.constraintzz}></ConstraintList>
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
