import { useState, useEffect, useMemo, useCallback } from "react"
import ReactFlow, {
    applyEdgeChanges,
    applyNodeChanges,
    Edge,
    EdgeChange,
    Node,
    NodeChange,
    Position,
} from "react-flow-renderer"
import useSchemazzStore from "@/Store/useSchemazzStore"
import showNameInput from "@/View/Dialog/showNameInput"
import useToastzzStore from "@/Store/useToastzzStore"
import { makeSchemaCRUD } from "@/Database/makeCRUD"
import ModalManager from "./Modal/ModalManager"
import NodeType from "./Diagram/NodeType"
import "./Diagram/style.css"
import useRelationzzStore from "@/Store/useRelationzzStore"
import { makeSchemaWithId } from "@/Database/Factory/makeSchema"

function DiagramPage() {
    const relationzzStore = useRelationzzStore()
    const schemazzStore = useSchemazzStore()
    const sToastzzStore = useToastzzStore()

    const [edgezz, setEdgezz] = useState<Edge[]>([])
    const [nodezz, setNodezz] = useState<Node<LB.Schema>[]>([])
    const nt = useMemo(() => NodeType, [])

    useEffect(() => {
        makeNodezz()
    }, [schemazzStore.itemzz])

    useEffect(() => {
        makeEdgezz()
    }, [relationzzStore.itemzz])

    function makeEdgezz() {
        try {
            const edgezz = relationzzStore.itemzz
                .filter((item) => item.schema0Id !== item.schema1Id)
                .map((item) => {
                    const source = schemazzStore.find(item.schema0Id)!
                    const target = schemazzStore.find(item.schema1Id)!
                    let sourceHandle = "sourceLeft"
                    let targetHandle = "targetRight"
                    if (Math.abs(source.x - target.x) < 222) {
                        // both right
                        sourceHandle = "sourceRight"
                    } else if (source.x < target.x) {
                        sourceHandle = "sourceRight"
                        targetHandle = "targetLeft"
                    }
                    return {
                        id: "relation" + item.id,
                        source: source.name,
                        target: target.name,
                        sourceHandle: sourceHandle + item.schema0Id,
                        targetHandle: targetHandle + item.schema1Id,
                    }
                })
            setEdgezz(edgezz)
        } catch (error) {
            console.error(error)
            sToastzzStore.showError(error)
            setEdgezz([])
        }
    }

    function makeNodezz() {
        const nodezz = schemazzStore.itemzz.map((schema) => {
            return {
                id: schema.name,
                type: "SchemaNode",
                position: { x: schema.x, y: schema.y },
                targetPosition: Position.Top,
                data: schema,
            }
        })
        setNodezz(nodezz)
    }

    const onNodesChange = useCallback(
        (changes: NodeChange[]) => setNodezz((zz) => applyNodeChanges(changes, zz)),
        [setNodezz],
    )
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => setEdgezz((zz) => applyEdgeChanges(changes, zz)),
        [setEdgezz],
    )

    function onNodeDragStop(
        event: React.MouseEvent<Element, MouseEvent>,
        node: Node<LB.Schema>,
    ) {
        // console.log(node.position)
        const data = {
            ...node.data,
            x: node.position.x,
            y: node.position.y,
        }
        makeSchemaCRUD()
            .update(data)
            .then((response) => schemazzStore.setItem(response))
            .then(() => makeEdgezz())
            .catch(sToastzzStore.showError)
    }

    return (
        <div className="h100">
            <div
                style={{
                    position: "fixed",
                    top: "66px",
                    zIndex: 1,
                }}
            >
                <button
                    onClick={() =>
                        showNameInput("Please input the Schema name", "")
                            .then((response) => {
                                if (response.isConfirmed) {
                                    return makeSchemaWithId(response.value)
                                }
                            })
                            .catch(sToastzzStore.showError)
                    }
                    className="btn btn-outline-primary"
                    type="button"
                >
                    +
                </button>
            </div>
            <ReactFlow
                nodes={nodezz}
                edges={edgezz}
                nodeTypes={nt}
                maxZoom={1}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodeDragStop={onNodeDragStop}
            ></ReactFlow>

            <ModalManager></ModalManager>
        </div>
    )
}

export default DiagramPage
