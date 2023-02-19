import { makeTypeFormatCRUD, makeEntityCRUD } from "@/Database/makeCRUD"
import createColumnTypeFormat from "@/Factory/createColumnTypeFormat"
import { OapiType } from "@/Model/Oapi"
import useToastzzStore from "@/Store/useToastzzStore"
import showNameInput from "../Dialog/showNameInput"
import Column from "./Column"

interface Property {
    columnzz: LB.Column[]
    item: LB.Entity
}

function ColumnList(property: Property) {
    const sToastzzStore = useToastzzStore()

    return (
        <table className="table table-sm table-borderless py0">
            <caption>
                <span
                    onClick={() =>
                        showNameInput("Please input the column name", "")
                            .then((response) => {
                                if (response.isConfirmed) {
                                    return createColumnTypeFormat(
                                        property.item.id,
                                        response.value,
                                        OapiType.integer,
                                    ).then(([column, tf]) =>
                                        makeTypeFormatCRUD().create(tf),
                                    )
                                }
                            })
                            .catch(sToastzzStore.showError)
                    }
                    className="button"
                >
                    + column
                </span>
                <span className="mx-1">{property.columnzz.length}</span>
                <span
                    onClick={() =>
                        makeEntityCRUD()
                            .update({
                                ...property.item,
                                openedColumn: !property.item.openedColumn,
                            })
                            .catch(sToastzzStore.showError)
                    }
                    className="button px-1"
                >
                    ˅
                </span>
            </caption>
            {property.item.openedColumn ? (
                <tbody>
                    {property.columnzz.map((data) => (
                        <Column
                            item={data}
                            entityId={property.item.id}
                            key={data.name}
                        ></Column>
                    ))}
                </tbody>
            ) : null}
        </table>
    )
}

export default ColumnList
