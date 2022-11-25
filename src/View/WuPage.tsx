import makeWu from "@/Database/Factory/makeWu"
import { makeWuCRUD } from "@/Database/makeCRUD"
import useListModalStore from "@/Store/useListModalStore"
import useSchemazzStore from "@/Store/useSchemazzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import useWuPageStore from "@/Store/useWuPageStore"
import useWuzzStore from "@/Store/useWuzzStore"
import ListModal from "./Modal/ListModal"
import LeftRightPanel from "./Part/LeftRightPanel"
import WuView from "./Wu/WuView"

export default function WuPage() {
    const sListModalStore = useListModalStore()
    const sSchemazzStore = useSchemazzStore()
    const sToastzzStore = useToastzzStore()
    const sWuzzStore = useWuzzStore()

    return (
        <div className="row">
            <LeftRightPanel
                makeCRUD={makeWuCRUD as any}
                onCreateClick={function () {
                    sListModalStore.openCB(
                        "Please select a Schema",
                        sSchemazzStore.itemzz.map((item) => item.name),
                        function (text) {
                            const found = sSchemazzStore.findByName(text)
                            if (found) {
                                let name = found.name
                                if (sWuzzStore.findByName(name)) {
                                    name += "-" + new Date().getTime()
                                }
                                return makeWuCRUD()
                                    .create(makeWu(name, found.id))
                                    .catch(sToastzzStore.showError)
                            }
                        },
                    )
                }}
                useItemPageStore={useWuPageStore}
                useItemzzStore={useWuzzStore}
                title="Wu"
            >
                <WuView></WuView>
            </LeftRightPanel>

            <ListModal></ListModal>
        </div>
    )
}
