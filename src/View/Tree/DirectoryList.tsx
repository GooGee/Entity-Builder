import Directory from "./Directory"

interface Property {
    parentId: number
    itemzz: LB.Directory[]
}

function DirectoryList(property: Property) {
    return (
        <div>
            {property.itemzz.map((item) => (
                <Directory key={item.id} item={item}></Directory>
            ))}
        </div>
    )
}

export default DirectoryList
