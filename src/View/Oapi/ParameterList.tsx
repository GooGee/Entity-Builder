import { makeParameterMapCRUD } from "@/Database/makeCRUD"
import { ParameterLocation } from "@/Model/Oapi"
import useParameterzzStore from "@/Store/useParameterzzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import { useEffect, useState } from "react"
import ItemList from "../Part/ItemList"

interface Property {
    inPath: boolean
    inResponse: boolean
    targetId: number
}

export default function ParameterList(property: Property) {
    const sParameterzzStore = useParameterzzStore()
    const sToastzzStore = useToastzzStore()

    const [itemzz, setItemzz] = useState<LB.ParameterMap[]>([])

    useEffect(() => {
        refresh()
    }, [property.inPath, property.targetId])

    function refresh() {
        makeParameterMapCRUD()
            .findAll()
            .then((response) =>
                setItemzz(
                    response.filter(function (item) {
                        if (
                            item.inPath === property.inPath &&
                            item.inResponse === property.inResponse
                        ) {
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
            fieldName="parameterId"
            itemzz={itemzz}
            source={sParameterzzStore.itemzz.filter(function (item) {
                if (property.inPath) {
                    return item.in === ParameterLocation.path
                }
                if (property.inResponse) {
                    if (item.in === ParameterLocation.query) {
                        return false
                    }
                }
                return item.in !== ParameterLocation.path
            })}
            create={function (parameterId) {
                return makeParameterMapCRUD()
                    .create({
                        parameterId,
                        inPath: property.inPath,
                        inResponse: property.inResponse,
                        targetId: property.targetId,
                    })
                    .then(refresh)
            }}
            delete={function (id) {
                return makeParameterMapCRUD().delete(id).then(refresh)
            }}
        ></ItemList>
    )
}
