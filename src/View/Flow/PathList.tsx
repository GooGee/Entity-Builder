import useFilezzStore from "@/Store/useFilezzStore"
import useFlowPageStore from "@/Store/useFlowPageStore"
import usePathzzStore from "@/Store/usePathzzStore"
import FileButton from "../Button/FileButton"
import ListGroup from "../Part/ListGroup"

interface Property {
    entity: LB.Entity
    module: LB.Module
}

export default function PathList(property: Property) {
    const sFilezzStore = useFilezzStore()
    const sFlowPageStore = useFlowPageStore()
    const sPathzzStore = usePathzzStore()

    const file = sFilezzStore.find(property.module.fileId)

    const routezz = sPathzzStore.itemzz.filter(
        (item) => item.moduleId === property.module.id && item.entityId === property.entity.id,
    )

    return (
        <div className="my-3">
            <div className="mb-3">
                {file === undefined ? (
                    <span className="text-danger">route file {property.module.fileId} not found</span>
                ) : (
                    <FileButton
                        file={file}
                        fullName
                        entity={property.entity}
                        module={property.module}
                    ></FileButton>
                )}
            </div>

            <ListGroup
                item={sFlowPageStore.path}
                itemzz={routezz}
                select={(item: LB.Path) => sFlowPageStore.setPath(item)}
            ></ListGroup>
        </div>
    )
}
