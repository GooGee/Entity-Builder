import { makeExampleMapCRUD } from "@/Database/makeCRUD"
import useExamplezzStore from "@/Store/useExamplezzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import { useEffect, useState } from "react"
import ItemList from "../Part/ItemList"

interface Property {
    requestId: number | null
    responseId: number | null
}

export default function ExampleList(property: Property) {
    const sExamplezzStore = useExamplezzStore()
    const sToastzzStore = useToastzzStore()

    const [itemzz, setItemzz] = useState<LB.ExampleMap[]>([])

    useEffect(() => {
        refresh()
    }, [property.requestId, property.responseId])

    function refresh() {
        makeExampleMapCRUD()
            .findAll()
            .then((response) =>
                setItemzz(
                    response.filter(
                        (item) =>
                            item.requestId === property.requestId &&
                            item.responseId === property.responseId,
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
                        requestId: property.requestId,
                        responseId: property.responseId,
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
