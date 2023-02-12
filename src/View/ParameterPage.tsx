import { makeColumnTypeFormat } from "@/Database/Factory/makeColumn"
import makeTypeFormat from "@/Database/Factory/makeTypeFormat"
import { makeColumnCRUD, makeTypeFormatCRUD } from "@/Database/makeCRUD"
import { PageEnum } from "@/menuzz"
import { OapiType } from "@/Model/Oapi"
import getCollectionItemzz from "@/Service/getCollectionItemzz"
import useColumnzzStore from "@/Store/useColumnzzStore"
import useEntityzzStore from "@/Store/useEntityzzStore"
import useParameterPageStore from "@/Store/useParameterPageStore"
import useToastzzStore from "@/Store/useToastzzStore"
import { useEffect, useState } from "react"
import showInput from "./Dialog/showInput"
import ParameterDetail from "./Oapi/ParameterDetail"
import RightTop from "./Part/RightTop"
import SideBar from "./Part/SideBar"

interface Property {
    page: PageEnum
}

export default function ParameterPage(property: Property) {
    const sColumnzzStore = useColumnzzStore()
    const sEntityzzStore = useEntityzzStore()
    const sParameterPageStore = useParameterPageStore()
    const sToastzzStore = useToastzzStore()

    const [itemzz, setItemzz] = useState<LB.Column[]>([])

    const constraintzz = getCollectionItemzz("ValidationRule")
    const entity = sEntityzzStore.findByName(property.page)
    if (entity === undefined) {
        return null
    }

    const message = "Please input the name"

    useEffect(() => {
        sParameterPageStore.setItem()
    }, [property.page])

    useEffect(() => {
        setItemzz(sColumnzzStore.itemzz.filter((item) => item.entityId === entity.id))
    }, [property.page, sColumnzzStore.itemzz])

    function make(name: string) {
        if (entity === undefined) {
            return null
        }

        const data = makeColumnTypeFormat(entity.id, name, OapiType.string)
        data.style = "form"
        if (
            [PageEnum.ParameterInHeader, PageEnum.ParameterInPath].includes(
                entity.name as any,
            )
        ) {
            data.style = "simple"
        }
        return makeColumnCRUD()
            .create(data)
            .then((item) => {
                const data = makeTypeFormat(OapiType.integer)
                data.ownerColumnId = item.id
                return makeTypeFormatCRUD().create(data)
            })
            .catch(sToastzzStore.showError)
    }

    return (
        <div className="row">
            <SideBar
                title={
                    property.page.includes("ParameterIn")
                        ? property.page.replace("ParameterIn", "")
                        : property.page
                }
                button={
                    <button
                        onClick={function () {
                            showInput(message, "")
                                .then((response) => {
                                    if (response.isConfirmed) {
                                        if (response.value) {
                                            return make(response.value)
                                        }
                                    }
                                })
                                .catch(sToastzzStore.showError)
                        }}
                        className="btn btn-outline-primary"
                        type="button"
                    >
                        +
                    </button>
                }
                itemzz={itemzz}
                useStore={useParameterPageStore}
            ></SideBar>

            <div className="col-9 py-3 h100 overflow-auto">
                {sParameterPageStore.item === undefined ? null : (
                    <>
                        <RightTop
                            item={sParameterPageStore.item}
                            makeCRUD={makeColumnCRUD}
                            message={message}
                            showDialog={showInput}
                            useItemPageStore={useParameterPageStore}
                        ></RightTop>
                        <ParameterDetail
                            constraintzz={constraintzz}
                            item={sParameterPageStore.item}
                        ></ParameterDetail>
                    </>
                )}
            </div>
        </div>
    )
}
