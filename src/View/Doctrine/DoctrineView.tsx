import { makeDoctrineColumnTypeCRUD } from "@/Database/makeCRUD"
import { OapiTypezz } from "@/Model/Oapi"
import getCollectionItemzz from "@/Service/getCollectionItemzz"
import useToastzzStore from "@/Store/useToastzzStore"
import SelectMapButton from "../Button/SelectMapButton"
import WebLink from "../Button/WebLink"

interface Property {
    item: LB.DoctrineColumnType
}

export default function DoctrineView(property: Property) {
    const sToastzzStore = useToastzzStore()

    const fmnzz = getCollectionItemzz("FakerMethod").map(
        (item) => [item.name, item.name] as [string, string],
    )

    const oapitzz = OapiTypezz.slice(0, 5).map(
        (item) => [item, item] as [string, string],
    )

    const raczz = getCollectionItemzz("RAC").map(
        (item) => [item.name, item.name] as [string, string],
    )

    function update(data: LB.DoctrineColumnType) {
        makeDoctrineColumnTypeCRUD().update(data).catch(sToastzzStore.showError)
    }

    return (
        <table className="table">
            <caption>
                <WebLink
                    className="me-3"
                    href="https://www.doctrine-project.org/projects/doctrine-dbal/en/latest/reference/types.html#mapping-matrix"
                >
                    Doctrine Column Type
                </WebLink>
                when creating a column with this type, clone the following properties to
                the column.
            </caption>
            <tbody>
                <tr>
                    <td className="w111">fakeMethod</td>
                    <td>
                        <SelectMapButton
                            allowEmpty
                            className="wa"
                            itemzz={fmnzz}
                            value={property.item.fakeMethod}
                            change={(fakeMethod) =>
                                update({
                                    ...property.item,
                                    fakeMethod,
                                })
                            }
                        ></SelectMapButton>
                    </td>
                </tr>
                <tr>
                    <td>fakeText</td>
                    <td>
                        <input
                            value={property.item.fakeText}
                            onChange={(event) =>
                                update({
                                    ...property.item,
                                    fakeText: event.target.value,
                                })
                            }
                            className="form-control wa"
                            type="text"
                        />
                    </td>
                </tr>
                <tr>
                    <td>oapiFormat</td>
                    <td>
                        <input
                            value={property.item.oapiFormat}
                            onChange={(event) =>
                                update({
                                    ...property.item,
                                    oapiFormat: event.target.value,
                                })
                            }
                            className="form-control wa"
                            type="text"
                        />
                    </td>
                </tr>
                <tr>
                    <td>oapiType</td>
                    <td>
                        <SelectMapButton
                            className="wa"
                            itemzz={oapitzz}
                            value={property.item.oapiType}
                            change={(oapiType) =>
                                update({
                                    ...property.item,
                                    oapiType,
                                })
                            }
                        ></SelectMapButton>
                    </td>
                </tr>
                <tr>
                    <td>phpType</td>
                    <td>
                        <input
                            value={property.item.phpType}
                            onChange={(event) =>
                                update({
                                    ...property.item,
                                    phpType: event.target.value,
                                })
                            }
                            className="form-control wa"
                            type="text"
                        />
                    </td>
                </tr>
                <tr>
                    <td>raField</td>
                    <td>
                        <SelectMapButton
                            className="wa"
                            itemzz={raczz}
                            value={property.item.raField}
                            change={function (raField) {
                                update({
                                    ...property.item,
                                    raField,
                                })
                            }}
                        ></SelectMapButton>
                    </td>
                </tr>
                <tr>
                    <td>raInput</td>
                    <td>
                        <SelectMapButton
                            className="wa"
                            itemzz={raczz}
                            value={property.item.raInput}
                            change={function (raInput) {
                                update({
                                    ...property.item,
                                    raInput,
                                })
                            }}
                        ></SelectMapButton>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
