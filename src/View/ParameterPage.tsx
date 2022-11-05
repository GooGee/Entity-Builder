import makeParameter from "@/Database/Factory/makeParameter"
import { makeParameterCRUD } from "@/Database/makeCRUD"
import { ParameterLocation } from "@/Model/Oapi"
import getCollectionItemzz from "@/Service/getCollectionItemzz"
import useParameterPageStore from "@/Store/useParameterPageStore"
import useParameterzzStore from "@/Store/useParameterzzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import { useEffect } from "react"
import ParameterDetail from "./Oapi/ParameterDetail"
import LeftRightPanel from "./Part/LeftRightPanel"

interface Property {
    isHeader: boolean
}

export default function ParameterPage(property: Property) {
    const sParameterPageStore = useParameterPageStore()
    const sParameterzzStore = useParameterzzStore()
    const sToastzzStore = useToastzzStore()

    const constraintzz = getCollectionItemzz("ValidationRule")

    useEffect(() => {
        sParameterPageStore.setItem()
    }, [property.isHeader])

    return (
        <div className="row">
            <LeftRightPanel
                itemzz={sParameterzzStore.itemzz.filter((item) => {
                    if (property.isHeader) {
                        return item.in === ParameterLocation.header
                    }
                    return item.in !== ParameterLocation.header
                })}
                title={property.isHeader ? "Header" : "Parameter"}
                makeCRUD={makeParameterCRUD as any}
                useItemPageStore={useParameterPageStore}
                useItemzzStore={useParameterzzStore}
                validateName={false}
                onCreate={function (name) {
                    const location = property.isHeader
                        ? ParameterLocation.header
                        : ParameterLocation.path
                    makeParameterCRUD()
                        .create(makeParameter(location, name))
                        .catch(sToastzzStore.showError)
                }}
            >
                {sParameterPageStore.item === undefined ? undefined : (
                    <ParameterDetail
                        constraintzz={constraintzz}
                        isHeader={property.isHeader}
                        item={sParameterPageStore.item}
                    ></ParameterDetail>
                )}
            </LeftRightPanel>
        </div>
    )
}
