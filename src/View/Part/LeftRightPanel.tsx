import CRUD from "@/Database/CRUD/CRUD"
import { NamedItemzzStoreDataType } from "@/Factory/makeNamedItemzzStoreData"
import { SideBarDataType } from "@/Factory/makeSideBarStoreData"
import useToastzzStore from "@/Store/useToastzzStore"
import { ReactElement, useEffect } from "react"
import { SweetAlertResult } from "sweetalert2"
import showInput from "../Dialog/showInput"
import showNameInput from "../Dialog/showNameInput"
import RightTop from "./RightTop"
import SideBar from "./SideBar"

interface Property {
    children?: ReactElement
    className?: string
    itemzz?: LB.SideBarItem[]
    sorting?: boolean
    title: string
    validateName?: boolean
    makeCRUD(): CRUD<LB.SideBarItem>
    onCreate?(name: string): void
    onCreateClick?(): void
    useItemzzStore(): NamedItemzzStoreDataType<LB.SideBarItem>
    useItemPageStore(): SideBarDataType<LB.SideBarItem>
}

export default function LeftRightPanel(property: Property) {
    const sPageStore = property.useItemPageStore()
    const sItemzzStore = property.useItemzzStore()
    const sToastzzStore = useToastzzStore()

    const message = `Please input the ${property.title} name`

    let showDialog: (
        text: string,
        inputValue: string,
    ) => Promise<SweetAlertResult<any>> = showInput
    if (property.validateName) {
        showDialog = showNameInput
    }

    useEffect(() => {
        if (sPageStore.item === undefined) {
            return
        }

        const found = sItemzzStore.find(sPageStore.item.id)
        sPageStore.setItem(found)
    }, [sItemzzStore.itemzz])

    function makeButton() {
        if (property.onCreateClick === undefined && property.onCreate === undefined) {
            return
        }

        return (
            <button
                onClick={
                    property.onCreateClick ??
                    function () {
                        showDialog(message, "")
                            .then((response) => {
                                if (response.isConfirmed) {
                                    if (response.value) {
                                        if (property.onCreate) {
                                            return property.onCreate(response.value)
                                        }
                                    }
                                }
                            })
                            .catch(sToastzzStore.showError)
                    }
                }
                className="btn btn-outline-primary"
                type="button"
            >
                +
            </button>
        )
    }

    return (
        <>
            <SideBar
                className={property.className}
                sorting={property.sorting}
                title={property.title}
                button={makeButton()}
                itemzz={property.itemzz ?? sItemzzStore.itemzz}
                useStore={property.useItemPageStore}
            ></SideBar>

            <div className={"col-9 py-3 h100 overflow-auto " + property.className}>
                {sPageStore.item === undefined ? null : (
                    <RightTop
                        item={sPageStore.item}
                        makeCRUD={property.makeCRUD}
                        message={message}
                        showDialog={showDialog}
                        useItemPageStore={property.useItemPageStore}
                        validateName={property.validateName}
                    ></RightTop>
                )}

                {property.children}
            </div>
        </>
    )
}
