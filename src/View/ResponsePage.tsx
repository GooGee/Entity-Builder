import { makeResponseCRUD } from "@/Database/makeCRUD"
import { PageEnum } from "@/menuzz"
import useResponsePageStore from "@/Store/useResponsePageStore"
import useResponsezzStore from "@/Store/useResponsezzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import ResponseDetail from "./Oapi/ResponseDetail"
import LeftRightPanel from "./Part/LeftRightPanel"

export default function ResponsePage() {
    const sResponsePageStore = useResponsePageStore()
    const sToastzzStore = useToastzzStore()

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
                title={PageEnum.Response}
                validateName={false}
            >
                {sResponsePageStore.item ? (
                    <ResponseDetail item={sResponsePageStore.item} update={update}></ResponseDetail>
                ) : undefined}
            </LeftRightPanel>
        </div>
    )
}
