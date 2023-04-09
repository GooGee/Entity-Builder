import useColumnzzStore from "@/Store/useColumnzzStore"
import { useState, useEffect } from "react"
import WebLink from "../Button/WebLink"
import CastField from "./CastField"

interface Property {
    entity: LB.Entity
}

export default function CastFieldList(property: Property) {
    const columnzzStore = useColumnzzStore()

    const [columnzz, setColumnzz] = useState<LB.Column[]>([])

    useEffect(() => {
        setColumnzz(
            columnzzStore.itemzz.filter((item) => item.entityId === property.entity.id),
        )
    }, [property.entity, columnzzStore.itemzz])

    return (
        <table className="table">
            <caption>
                <h3 className="inline me-3">Cast</h3>
                <WebLink href="https://laravel.com/docs/9.x/eloquent-mutators">
                    doc
                </WebLink>
            </caption>
            <thead>
                <tr>
                    <th>column</th>
                    <th>fillable / read only / write only</th>
                    <th>type</th>
                    <th>cast</th>
                </tr>
            </thead>
            <tbody>
                {columnzz.map((item) => (
                    <CastField key={item.id} item={item}></CastField>
                ))}
            </tbody>
        </table>
    )
}
