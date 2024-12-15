import StringList from "../Part/StringList"

interface Property {
    item: LB.Path
    middlewarezz: string[]
    path: LB.Path
    update(data: LB.Path): void
}

export default function PathMiddlewareList(property: Property) {
    return (
        <StringList
            itemzz={property.item.middlewarezz}
            source={property.middlewarezz}
            create={function (name) {
                const set = new Set(property.item.middlewarezz)
                if (set.has(name)) {
                    return
                }
                const zz = Array.from(set.values())
                zz.push(name)
                zz.sort()
                property.update({
                    ...property.item,
                    middlewarezz: zz,
                })
            }}
            delete={function (name) {
                const index = property.item.middlewarezz.indexOf(name)
                if (index === -1) {
                    return
                }
                const zz = [...property.item.middlewarezz]
                zz.splice(index, 1)
                property.update({
                    ...property.item,
                    middlewarezz: zz,
                })
            }}
        ></StringList>
    )
}
