import { makeServerMapCRUD } from "@/Database/makeCRUD"
import useServerzzStore from "@/Store/useServerzzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import { useState, useEffect } from "react"
import ItemList from "../Part/ItemList"

interface Property {
    pathId: number | null
    requestId: number | null
}

export default function ServerList(property: Property) {
    const sServerzzStore = useServerzzStore()
    const sToastzzStore = useToastzzStore()

    const [itemzz, setItemzz] = useState<LB.ServerMap[]>([])

    useEffect(() => {
        refresh()
    }, [property.requestId, property.pathId])

    function refresh() {
        makeServerMapCRUD()
            .findAll()
            .then((response) =>
                setItemzz(
                    response.filter(function (item) {
                        return (
                            item.requestId === property.requestId &&
                            item.pathId === property.pathId
                        )
                    }),
                ),
            )
            .catch(sToastzzStore.showError)
    }

    return (
        <ItemList
            fieldName="serverId"
            itemzz={itemzz}
            source={sServerzzStore.itemzz.filter((item) => item.global === false)}
            create={function (serverId) {
                return makeServerMapCRUD()
                    .create({
                        serverId,
                        pathId: property.pathId,
                        requestId: property.requestId,
                    })
                    .then(refresh)
            }}
            delete={function (id) {
                return makeServerMapCRUD().delete(id).then(refresh)
            }}
        ></ItemList>
    )
}
