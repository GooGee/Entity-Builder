import { SideBarDataType } from "@/Factory/makeSideBarStoreData"
import ColorEnum from "@/Model/ColorEnum"
import { useState, useEffect, ReactElement } from "react"
import ColorButtonDropdown from "../Button/ColorButtonDropdown"

interface Property {
    button?: ReactElement
    className?: string
    itemzz: LB.SideBarItem[]
    sorting?: boolean
    title: string
    useStore(): SideBarDataType
}

export default function SideBar(property: Property) {
    const store = property.useStore()

    const [itemzz, setItemzz] = useState<LB.SideBarItem[]>([])

    useEffect(() => {
        const zz = filter()
        if (property.sorting) {
            zz.sort((aa, bb) => aa.name.localeCompare(bb.name))
        }
        setItemzz(zz)
    }, [store.color, store.keyword, property.itemzz])

    function filter() {
        if (store.color === ColorEnum.white && store.keyword === "") {
            return [...property.itemzz]
        }
        if (store.color === ColorEnum.white) {
            return property.itemzz.filter((item) => item.name.includes(store.keyword))
        }
        if (store.keyword === "") {
            return property.itemzz.filter((item) => item.color === store.color)
        }
        return property.itemzz.filter(
            (item) => item.color === store.color && item.name.includes(store.keyword),
        )
    }

    return (
        <div className={"col-3 py-3 h100 overflow-auto " + property.className}>
            <div className="d-flex align-items-center">
                <h1 className="inline">{property.title}</h1>
                <ColorButtonDropdown
                    color={store.color}
                    setColor={store.setColor}
                    className="mx-1"
                ></ColorButtonDropdown>
                {property.button}
            </div>

            <input
                value={store.keyword}
                onChange={(event) => store.search(event.target.value)}
                className="form-control mb-3"
                type="text"
            />

            <ul className="list-group">
                {itemzz.map((item) => (
                    <li
                        onClick={() => store.setItem(item)}
                        className={
                            (store.item?.id === item.id ? "active " : "") +
                            "list-group-item list-group-item-action pointer"
                        }
                        key={item.id}
                    >
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}
