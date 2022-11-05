import File from "./File"

interface Property {
    directoryId: number
    itemzz: LB.File[]
}

function FileList(property: Property) {
    return (
        <div>
            {property.itemzz.map((item) => (
                <File key={item.id} item={item}></File>
            ))}
        </div>
    )
}

export default FileList
