import { makeRequestCRUD } from "@/Database/makeCRUD"
import useRequestPageStore from "@/Store/useRequestPageStore"
import useRequestzzStore from "@/Store/useRequestzzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import RequestDetail from "./Oapi/RequestDetail"
import LeftRightPanel from "./Part/LeftRightPanel"

export default function RequestPage() {
    const sRequestPageStore = useRequestPageStore()
    const sToastzzStore = useToastzzStore()

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
