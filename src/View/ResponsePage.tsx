import makeResponse from "@/Database/Factory/makeResponse"
import { makeResponseCRUD } from "@/Database/makeCRUD"
import { makeNameMap } from "@/Factory/makeMap"
import useResponsePageStore from "@/Store/useResponsePageStore"
import useResponsezzStore from "@/Store/useResponsezzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import useWuzzStore from "@/Store/useWuzzStore"
import showSelect from "./Dialog/showSelect"
import ResponseDetail from "./Oapi/ResponseDetail"
import LeftRightPanel from "./Part/LeftRightPanel"

export default function ResponsePage() {
    const sResponsePageStore = useResponsePageStore()
    const sResponsezzStore = useResponsezzStore()
    const sToastzzStore = useToastzzStore()
    const sWuzzStore = useWuzzStore()

    const title = "Response"

    function update(item: LB.Response) {
        sResponsePageStore.setItem(item)
        makeResponseCRUD()
            .update(item)
            .then((response) => sResponsePageStore.setItem(response))
            .catch(sToastzzStore.showError)
    }

    return (
        <div className="row">
            <LeftRightPanel
                makeCRUD={makeResponseCRUD as any}
                useItemPageStore={useResponsePageStore}
                useItemzzStore={useResponsezzStore}
                title={title}
                validateName={false}
                onCreateClick={function () {
                    showSelect("Please select a Wu", "", makeNameMap(sWuzzStore.itemzz))
                        .then((response) => {
                            if (response.isConfirmed) {
                                const found = sWuzzStore.findByName(response.value)
                                if (found) {
                                    let name = found.name + title
                                    if (sResponsezzStore.findByName(name)) {
                                        name += "-" + new Date().getTime()
                                    }
                                    return makeResponseCRUD().create(
                                        makeResponse(name, found.id),
                                    )
                                }
                            }
                        })
                        .catch(sToastzzStore.showError)
                }}
            >
                {sResponsePageStore.item ? (
                    <ResponseDetail
                        item={sResponsePageStore.item}
                        update={update}
                    ></ResponseDetail>
                ) : undefined}
            </LeftRightPanel>
        </div>
    )
}
