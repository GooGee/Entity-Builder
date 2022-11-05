import { makeServerMapCRUD } from "@/Database/makeCRUD"
import useServerzzStore from "@/Store/useServerzzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import { useState, useEffect } from "react"
import ItemList from "../Part/ItemList"

interface Property {
    forPath: boolean
    targetId: number
}

export default function ServerList(property: Property) {
    const sServerzzStore = useServerzzStore()
    const sToastzzStore = useToastzzStore()

    const [itemzz, setItemzz] = useState<LB.ServerMap[]>([])

    useEffect(() => {
        refresh()
    }, [property.forPath, property.targetId])

    function refresh() {
        makeServerMapCRUD()
            .findAll()
            .then((response) =>
                setItemzz(
                    response.filter(function (item) {
                        if (item.forPath === property.forPath) {
                            // ok
                        } else {
                            return false
                        }

                        return item.targetId === property.targetId
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
                        forPath: property.forPath,
                        targetId: property.targetId,
                    })
                    .then(refresh)
            }}
            delete={function (id) {
                return makeServerMapCRUD().delete(id).then(refresh)
            }}
        ></ItemList>
    )
}
