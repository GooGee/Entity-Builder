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
import useEntityzzStore from "@/Store/useEntityzzStore"
import showNameInput from "@/View/Dialog/showNameInput"
import useToastzzStore from "@/Store/useToastzzStore"
import { makeEntityCRUD } from "@/Database/makeCRUD"
import ModalManager from "./Modal/ModalManager"
import NodeType from "./Diagram/NodeType"
import "./Diagram/style.css"
import useRelationzzStore from "@/Store/useRelationzzStore"
import { makeEntityWithId } from "@/Database/Factory/makeEntity"

export default function DiagramPage() {
    const relationzzStore = useRelationzzStore()
    const entityzzStore = useEntityzzStore()
    const sToastzzStore = useToastzzStore()

    const [edgezz, setEdgezz] = useState<Edge[]>([])
    const [nodezz, setNodezz] = useState<Node<LB.Entity>[]>([])
    const nt = useMemo(() => NodeType, [])

    useEffect(() => {
        makeNodezz()
    }, [entityzzStore.itemzz])

    useEffect(() => {
        makeEdgezz()
    }, [relationzzStore.itemzz])

    function makeEdgezz() {
        try {
            const edgezz = relationzzStore.itemzz
                .filter((item) => item.entity0Id !== item.entity1Id)
                .map((item) => {
                    const source = entityzzStore.find(item.entity0Id)!
                    const target = entityzzStore.find(item.entity1Id)!
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
                        sourceHandle: sourceHandle + item.entity0Id,
                        targetHandle: targetHandle + item.entity1Id,
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
        const nodezz = entityzzStore.itemzz.map((entity) => {
            return {
                id: entity.name,
                type: "EntityNode",
                position: { x: entity.x, y: entity.y },
                targetPosition: Position.Top,
                data: entity,
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
        node: Node<LB.Entity>,
    ) {
        // console.log(node.position)
        const data = {
            ...node.data,
            x: node.position.x,
            y: node.position.y,
        }
        makeEntityCRUD()
            .update(data)
            .then((response) => entityzzStore.setItem(response))
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
                        showNameInput("Please input the Entity name", "")
                            .then((response) => {
                                if (response.isConfirmed) {
                                    return makeEntityWithId(response.value)
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
