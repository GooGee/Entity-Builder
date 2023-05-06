import { makeForeignKeyId, SchemaEnum } from "@/Database/createSchema"
import { makeModuleActionCRUD, makeRequestCRUD } from "@/Database/makeCRUD"
import { PageEnum } from "@/menuzz"
import useRequestPageStore from "@/Store/useRequestPageStore"
import useRequestzzStore from "@/Store/useRequestzzStore"
import showInput from "./Dialog/showInput"
import RequestDetail from "./Oapi/RequestDetail"
import RightTop from "./Part/RightTop"
import SideBar from "./Part/SideBar"

export default function RequestPage() {
    const sRequestPageStore = useRequestPageStore()
    const sRequestzzStore = useRequestzzStore()

    return (
        <div className="row">
            <SideBar
                title={PageEnum.Request}
                itemzz={sRequestzzStore.itemzz}
                useStore={useRequestPageStore}
            ></SideBar>

            <div className="col-9 py-3 h100 overflow-auto">
                {sRequestPageStore.item ? (
                    <>
                        <RightTop
                            item={sRequestPageStore.item}
                            makeCRUD={makeRequestCRUD}
                            message={`Please input the ${PageEnum.Request} name`}
                            showDialog={showInput}
                            useItemPageStore={useRequestPageStore}
                            validateName={false}
                            onDeleteBefore={function () {
                                sRequestPageStore.setItem(undefined)
                                // delete Request, but keep ModuleAction
                                return makeModuleActionCRUD().updateManyColumn(
                                    makeForeignKeyId(SchemaEnum.Request),
                                    1,
                                    sRequestPageStore.item!.id,
                                )
                            }}
                        ></RightTop>

                        <RequestDetail item={sRequestPageStore.item}></RequestDetail>
                    </>
                ) : undefined}
            </div>
        </div>
    )
}
