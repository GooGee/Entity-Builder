import { makeIndexColumnCRUD } from "@/Database/makeCRUD"
import useToastzzStore from "@/Store/useToastzzStore"
import IndexColumn from "./IndexColumn"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { useEffect, useState } from "react"
import SelectButton from "../Button/SelectButton"

interface Property {
    cicm: Map<number, LB.Column>
    columnzz: LB.Column[]
    indexId: number
}

export default function IndexColumnList(property: Property) {
    const sToastzzStore = useToastzzStore()

    const [columnzz, setColumnzz] = useState<LB.IndexColumn[]>([])

    useEffect(() => {
        refresh()
    }, [property.indexId])

    function refresh() {
        makeIndexColumnCRUD()
            .findAllBelongTo([property.indexId], "indexId")
            .then((response) => setColumnzz(response.sort((aa, bb) => aa.sort - bb.sort)))
            .catch(sToastzzStore.showError)
    }

    return (
        <div>
            <div>
                <SelectButton
                    className="wa"
                    isAdd
                    itemzz={property.columnzz}
                    value={0}
                    change={function (columnId) {
                        makeIndexColumnCRUD()
                            .create({
                                indexId: property.indexId,
                                columnId,
                                sort: columnzz.length,
                            })
                            .then(() => refresh())
                            .catch(sToastzzStore.showError)
                    }}
                ></SelectButton>
            </div>

            <DragDropContext
                onDragEnd={(result) => {
                    if (result.destination === undefined) {
                        return
                    }
                    if (result.source.index === result.destination.index) {
                        return
                    }
                    if (columnzz.length < 2) {
                        return
                    }

                    const itemzz = [...columnzz]
                    const [source] = itemzz.splice(result.source.index, 1)
                    itemzz.splice(result.destination.index, 0, source)
                    itemzz.forEach((item, index) => (item.sort = index))
                    makeIndexColumnCRUD()
                        .updateMany(itemzz)
                        .then(() => refresh())
                        .catch(sToastzzStore.showError)
                }}
            >
                <Droppable droppableId="IndexColumnListDroppable">
                    {(provided, snapshot) => (
                        <ul className="list-unstyled" ref={provided.innerRef} {...provided.droppableProps}>
                            {columnzz.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                    {(provided, snapshot) => (
                                        <li
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <IndexColumn cicm={property.cicm} item={item} refresh={refresh}></IndexColumn>
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}
