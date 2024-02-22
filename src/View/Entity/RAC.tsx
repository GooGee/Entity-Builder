import getCollectionItemzz from "@/Service/getCollectionItemzz"
import useColumnzzStore from "@/Store/useColumnzzStore"
import { useState, useEffect } from "react"
import WebLink from "../Button/WebLink"
import RacColumn from "./RacColumn"

interface Property {
    entity: LB.Entity
}

export default function RAC(property: Property) {
    const columnzzStore = useColumnzzStore()

    const [columnzz, setColumnzz] = useState<LB.Column[]>([])

    const nnzz = getCollectionItemzz("RAC").map((item) => [item.name, item.name] as [string, string])

    useEffect(() => {
        setColumnzz(columnzzStore.itemzz.filter((item) => item.entityId === property.entity.id))
    }, [property.entity, columnzzStore.itemzz])

    return (
        <table className="table">
            <caption>
                <h3 className="inline me-3">React-Admin Component</h3>
                <WebLink href="https://marmelab.com/react-admin/documentation.html">doc</WebLink>
            </caption>
            <thead>
                <tr>
                    <th className="w111">name</th>
                    <th>field</th>
                    <th>input</th>
                </tr>
            </thead>
            <tbody>
                {columnzz.map((item) => (
                    <RacColumn entity={property.entity} item={item} key={item.id} nnzz={nnzz}></RacColumn>
                ))}
            </tbody>
        </table>
    )
}
