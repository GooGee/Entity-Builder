import { makeVariableCRUD } from "@/Database/makeCRUD"
import { EnumTypezz } from "@/Model/Oapi"
import useToastzzStore from "@/Store/useToastzzStore"
import ColorButtonGroup from "../Button/ColorButtonGroup"
import SelectStringButton from "../Button/SelectStringButton"
import VariableValueList from "./VariableValueList"
import FileButton from "../Button/FileButton"
import useFilezzStore from "@/Store/useFilezzStore"

interface Property {
    item: LB.Variable
}

export default function VariableDetail(property: Property) {
    const file = useFilezzStore().findByName("Enum")
    if (file === undefined) {
        useToastzzStore().showDanger("Enum file not found")
        return null
    }

    function update(item: LB.Variable) {
        makeVariableCRUD().update(item).catch(useToastzzStore().showError)
    }

    return (
        <table className="table td0-tar">
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
                    <td>type</td>
                    <td>
                        <SelectStringButton
                            className="wa"
                            itemzz={EnumTypezz}
                            value={property.item.type}
                            change={function (type) {
                                update({
                                    ...property.item,
                                    type,
                                })
                            }}
                        ></SelectStringButton>
                    </td>
                </tr>
                <tr>
                    <td>default</td>
                    <td>
                        <SelectStringButton
                            className="wa"
                            itemzz={property.item.enum}
                            value={property.item.default}
                            change={function (text) {
                                update({
                                    ...property.item,
                                    default: text,
                                })
                            }}
                        ></SelectStringButton>
                    </td>
                </tr>
                <tr>
                    <td>enum</td>
                    <td>
                        <VariableValueList item={property.item} update={update}></VariableValueList>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <FileButton action="" file={file} entity={property.item}></FileButton>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
