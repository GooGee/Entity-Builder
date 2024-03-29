import { makePathMethodCRUD } from "@/Database/makeCRUD"
import { HttpMethodzz } from "@/Model/Oapi"
import getCollectionItemzz from "@/Service/getCollectionItemzz"
import useModuleActionzzStore from "@/Store/useModuleActionzzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import { useEffect, useState } from "react"
import PathMethod from "./PathMethod"

interface Property {
    item: LB.Path
    module: LB.Module
}

export default function PathMethodList(property: Property) {
    const sModuleActionzz = useModuleActionzzStore()
    const sToastzzStore = useToastzzStore()

    const [itemzz, setItemzz] = useState<LB.PathMethod[]>([])

    const middlewarezz = getCollectionItemzz("Middleware").map((item) => item.name)
    const mazz = sModuleActionzz.itemzz
        .filter(
            (item) =>
                item.entityId === property.item.entityId &&
                item.moduleId === property.item.moduleId,
        )
        .sort((aa, bb) => aa.name.localeCompare(bb.name))

    useEffect(() => {
        refresh()
    }, [property.item])

    function refresh() {
        makePathMethodCRUD()
            .findAll()
            .then((response) =>
                setItemzz(response.filter((item) => item.pathId === property.item.id)),
            )
            .catch(sToastzzStore.showError)
    }

    return (
        <>
            {HttpMethodzz.map((item) => (
                <PathMethod
                    key={item}
                    itemzz={itemzz}
                    mazz={mazz}
                    method={item}
                    middlewarezz={middlewarezz}
                    path={property.item}
                    refresh={refresh}
                ></PathMethod>
            ))}
        </>
    )
}
