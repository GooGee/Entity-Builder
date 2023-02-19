import LayerEnum from "@/Model/LayerEnum"
import useFilezzStore from "@/Store/useFilezzStore"
import { useEffect, useState } from "react"
import FileItem from "../Entity/FileItem"

interface Property {
    entity: LB.Entity
    ma?: LB.ModuleAction
    module: LB.Module
}

export default function RacFileList(property: Property) {
    const sFilezzStore = useFilezzStore()

    const [filezz, setFilezz] = useState<LB.File[]>([])

    useEffect(() => {
        setFilezz(sFilezzStore.itemzz.filter((item) => item.layer === LayerEnum.View))
    }, [])

    return (
        <table className="table">
            <tbody>
                {filezz.map((item) => (
                    <FileItem
                        entity={property.entity}
                        item={item}
                        key={item.id}
                        ma={property.ma}
                        module={property.module}
                    ></FileItem>
                ))}
            </tbody>
        </table>
    )
}
