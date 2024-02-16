import makeTypeFormat from "@/Database/Factory/makeTypeFormat"
import makeWu from "@/Database/Factory/makeWu"
import { makeTypeFormatCRUD, makeWuCRUD } from "@/Database/makeCRUD"
import { PageEnum } from "@/menuzz"
import useEntityzzStore from "@/Store/useEntityzzStore"
import useListModalStore from "@/Store/useListModalStore"
import useToastzzStore from "@/Store/useToastzzStore"
import useWuPageStore from "@/Store/useWuPageStore"
import useWuzzStore from "@/Store/useWuzzStore"
import LeftRightPanel from "./Part/LeftRightPanel"
import WuView from "./Wu/WuView"

export default function WuPage() {
    const sListModalStore = useListModalStore()
    const sEntityzzStore = useEntityzzStore()
    const sToastzzStore = useToastzzStore()
    const sWuzzStore = useWuzzStore()

    return (
        <div className="row">
            <LeftRightPanel
                makeCRUD={makeWuCRUD as any}
                onCreateClick={function () {
                    sListModalStore.openCB(
                        "Please select a Entity",
                        sEntityzzStore.itemzz.map((item) => item.name),
                        function (text) {
                            const found = sEntityzzStore.findByName(text)
                            if (found) {
                                let name = found.name
                                if (sWuzzStore.findByName(name)) {
                                    name += "-" + new Date().getTime()
                                }
                                return makeWuCRUD()
                                    .create(makeWu(name, found.id))
                                    .then((item) => {
                                        const data = makeTypeFormat()
                                        data.ownerWuId = item.id
                                        return makeTypeFormatCRUD().create(data)
                                    })
                                    .catch(sToastzzStore.showError)
                            }
                        },
                    )
                }}
                useItemPageStore={useWuPageStore}
                useItemzzStore={useWuzzStore}
                title={PageEnum.Wu}
            >
                <WuView></WuView>
            </LeftRightPanel>
        </div>
    )
}
