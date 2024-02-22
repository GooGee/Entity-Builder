import useDirectoryModalStore from "@/Store/useDirectoryModalStore"
import useDirectoryzzStore from "@/Store/useDirectoryzzStore"

interface Property {
    item: LB.Directory
}

export default function DirectoryDetail(property: Property) {
    const sDirectoryModal = useDirectoryModalStore()
    const sDirectoryzzStore = useDirectoryzzStore()

    const directoryzz = sDirectoryzzStore.itemzz
        .filter((item) => item.parentId === property.item.id)
        .sort((aa, bb) => aa.name.localeCompare(bb.name))

    return (
        <div className="ms-4">
            <div
                onClick={function () {
                    sDirectoryModal.setItemId(property.item.id)
                }}
                className={(property.item.id === sDirectoryModal.itemId ? "active " : "") + "button yellow"}
            >
                {property.item.name}
            </div>
            {directoryzz.map((item) => (
                <DirectoryDetail key={item.id} item={item}></DirectoryDetail>
            ))}
        </div>
    )
}
