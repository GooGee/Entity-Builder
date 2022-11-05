import useTreeStore from "@/Store/useTreeStore"

interface Property {
    item: LB.File
}

function File(property: Property) {
    const treeStore = useTreeStore()

    return (
        <div>
            <span className="text-primary">|</span>
            <button
                onClick={() => treeStore.showFile(property.item.id)}
                className={
                    "button" +
                    (property.item.id === treeStore.fileId ? " active" : "")
                }
                type="button"
            >
                {property.item.name}
            </button>
        </div>
    )
}

export default File
