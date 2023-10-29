import { makeRelationCRUD } from "@/Database/makeCRUD"
import RelationType, { getRelationMeaning } from "@/Database/RelationType"
import useToastzzStore from "@/Store/useToastzzStore"
import SelectButton from "../Button/SelectButton"
import showConfirm from "../Dialog/showConfirm"
import showNameInput from "../Dialog/showNameInput"

interface Property {
    columnzz: LB.Column[]
    item: LB.Relation
    entity: LB.Entity
}

export default function Relation(property: Property) {
    const sToastzzStore = useToastzzStore()

    const self = property.item.entity0Id === property.item.entity1Id
    const reversed = property.entity.id !== property.item.entity0Id || self
    const name = reversed ? property.item.name1 : property.item.name0

    function change(name: string, reversed: boolean) {
        showNameInput("Please input the name", name)
            .then((response) => {
                if (response.isConfirmed) {
                    const data = { ...property.item }
                    if (reversed) {
                        data.name1 = response.value
                    } else {
                        data.name0 = response.value
                    }
                    return update(data)
                }
            })
            .catch(sToastzzStore.showError)
    }

    function update(data: LB.Relation) {
        return makeRelationCRUD().update(data)
    }

    return (
        <tr>
            <td className="text-secondary">
                <div className="d-flex">
                    <div className="me-1">
                        <button
                            onClick={function () {
                                showConfirm()
                                    .then((response) => {
                                        if (response.isConfirmed) {
                                            return makeRelationCRUD().delete(
                                                property.item.id,
                                            )
                                        }
                                    })
                                    .catch(sToastzzStore.showError)
                            }}
                            className="btn btn-outline-danger"
                            type="button"
                        >
                            -
                        </button>
                    </div>

                    <div>
                        <div className="mt-1">
                            {getRelationMeaning(property.item.type, reversed)}
                        </div>

                        {self && property.item.type === RelationType.OneToMany ? (
                            <div className="mt-4">has many</div>
                        ) : null}
                    </div>
                </div>
            </td>
            <td>
                <div>
                    <button
                        className="btn btn-outline-primary"
                        type="button"
                        onClick={function () {
                            change(name, reversed)
                        }}
                    >
                        {name}
                    </button>
                </div>

                {self && property.item.type === RelationType.OneToMany ? (
                    <div className="mt-3">
                        <button
                            className="btn btn-outline-primary"
                            type="button"
                            onClick={function () {
                                change(property.item.name0, false)
                            }}
                        >
                            {property.item.name0}
                        </button>
                    </div>
                ) : null}
            </td>
            <td>
                {reversed ? (
                    <SelectButton
                        itemzz={property.columnzz}
                        value={property.item.column1Id}
                        change={function (column1Id) {
                            update({
                                ...property.item,
                                column1Id,
                            }).catch(sToastzzStore.showError)
                        }}
                    ></SelectButton>
                ) : null}
            </td>
        </tr>
    )
}
