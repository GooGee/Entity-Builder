import { makeExampleMapCRUD } from "@/Database/makeCRUD"
import useExamplezzStore from "@/Store/useExamplezzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import { useEffect, useState } from "react"
import ItemList from "../Part/ItemList"

interface Property {
    isRequest: boolean
    targetId: number
}

export default function ExampleList(property: Property) {
    const sExamplezzStore = useExamplezzStore()
    const sToastzzStore = useToastzzStore()

    const [itemzz, setItemzz] = useState<LB.ExampleMap[]>([])

    useEffect(() => {
        refresh()
    }, [property.isRequest, property.targetId])

    function refresh() {
        makeExampleMapCRUD()
            .findAll()
            .then((response) =>
                setItemzz(
                    response.filter(
                        (item) =>
                            item.isRequest === property.isRequest &&
                            item.targetId === property.targetId,
                    ),
                ),
            )
            .catch(sToastzzStore.showError)
    }

    return (
        <ItemList
            fieldName="exampleId"
            itemzz={itemzz}
            source={sExamplezzStore.itemzz}
            create={function (exampleId) {
                return makeExampleMapCRUD()
                    .create({
                        exampleId,
                        isRequest: property.isRequest,
                        targetId: property.targetId,
                    })
                    .then(() => refresh())
            }}
            delete={function (id) {
                return makeExampleMapCRUD()
                    .delete(id)
                    .then(() => refresh())
            }}
        ></ItemList>
    )
}
