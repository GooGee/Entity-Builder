import { makeSchemaCRUD } from "@/Database/makeCRUD"
import useColumnzzStore from "@/Store/useColumnzzStore"
import useSchemaModalStore from "@/Store/useSchemaModalStore"
import useToastzzStore from "@/Store/useToastzzStore"
import showConfirm from "@/View/Dialog/showConfirm"
import { useState, useEffect } from "react"
import { Handle, Position } from "react-flow-renderer"
import ColumnList from "./ColumnList"
import RelationList from "./RelationList"

interface Property {
    data: LB.Schema
    dragging: boolean
    xPos: number
    yPos: number
}

function SchemaNode(property: Property) {
    const sColumnzzStore = useColumnzzStore()
    const modalStore = useSchemaModalStore()
    const sToastzzStore = useToastzzStore()

    const [columnzz, setColumnzz] = useState<LB.Column[]>([])

    useEffect(() => {
        setColumnzz(
            sColumnzzStore.itemzz.filter((item) => item.schemaId === property.data.id),
        )
    }, [sColumnzzStore.itemzz])

    return (
        <div className="SchemaNode">
            <div className="d-flex justify-content-center">
                {property.data.reserved ? null : (
                    <span
                        onClick={function () {
                            showConfirm()
                                .then((response) => {
                                    if (response.isConfirmed) {
                                        return makeSchemaCRUD().delete(property.data.id)
                                    }
                                })
                                .catch(sToastzzStore.showError)
                        }}
                        className="button danger px-1"
                    >
                        -
                    </span>
                )}
                <span
                    onClick={() => modalStore.open(property.data.id)}
                    className="button mx-1"
                >
                    {property.data.name}
                </span>
                <button
                    onClick={() =>
                        makeSchemaCRUD()
                            .update({
                                ...property.data,
                                opened: !property.data.opened,
                            })
                            .catch(sToastzzStore.showError)
                    }
                    className="button px-1"
                    type="button"
                >
                    ˅
                </button>
            </div>
            {property.data.opened ? (
                <>
                    <ColumnList columnzz={columnzz} item={property.data}></ColumnList>
                    <RelationList schema={property.data}></RelationList>
                </>
            ) : null}
            <Handle
                type="source"
                position={Position.Left}
                id={"sourceLeft" + property.data.id}
                isConnectable={false}
            />
            <Handle
                type="source"
                position={Position.Right}
                id={"sourceRight" + property.data.id}
                isConnectable={false}
            />
            <Handle
                type="target"
                position={Position.Left}
                id={"targetLeft" + property.data.id}
                isConnectable={false}
            />
            <Handle
                type="target"
                position={Position.Right}
                id={"targetRight" + property.data.id}
                isConnectable={false}
            />
        </div>
    )
}

export default SchemaNode
