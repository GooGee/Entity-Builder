import makeRequest from "@/Database/Factory/makeRequest"
import { makeRequestCRUD } from "@/Database/makeCRUD"
import { makeNameMap } from "@/Factory/makeMap"
import useRequestPageStore from "@/Store/useRequestPageStore"
import useRequestzzStore from "@/Store/useRequestzzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import useWuzzStore from "@/Store/useWuzzStore"
import showSelect from "./Dialog/showSelect"
import RequestDetail from "./Oapi/RequestDetail"
import LeftRightPanel from "./Part/LeftRightPanel"

export default function RequestPage() {
    const sRequestPageStore = useRequestPageStore()
    const sRequestzzStore = useRequestzzStore()
    const sToastzzStore = useToastzzStore()
    const sWuzzStore = useWuzzStore()

    const title = "Request"

    function update(item: LB.Request) {
        sRequestPageStore.setItem(item)
        makeRequestCRUD()
            .update(item)
            .then((response) => sRequestPageStore.setItem(response))
            .catch(sToastzzStore.showError)
    }

    return (
        <div className="row">
            <LeftRightPanel
                makeCRUD={makeRequestCRUD as any}
                useItemPageStore={useRequestPageStore}
                useItemzzStore={useRequestzzStore}
                title={title}
                validateName={false}
                onCreateClick={function () {
                    showSelect("Please select a Wu", "", makeNameMap(sWuzzStore.itemzz))
                        .then((response) => {
                            if (response.isConfirmed) {
                                const found = sWuzzStore.findByName(response.value)
                                if (found) {
                                    let name = found.name + title
                                    if (sRequestzzStore.findByName(name)) {
                                        name += "-" + new Date().getTime()
                                    }
                                    return makeRequestCRUD().create(
                                        makeRequest(name, found.id),
                                    )
                                }
                            }
                        })
                        .catch(sToastzzStore.showError)
                }}
            >
                {sRequestPageStore.item ? (
                    <RequestDetail
                        item={sRequestPageStore.item}
                        update={update}
                    ></RequestDetail>
                ) : undefined}
            </LeftRightPanel>
        </div>
    )
}
