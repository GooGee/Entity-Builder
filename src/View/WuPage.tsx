import makeWu from "@/Database/Factory/makeWu"
import { makeWuCRUD } from "@/Database/makeCRUD"
import { makeNameMap } from "@/Factory/makeMap"
import useSchemazzStore from "@/Store/useSchemazzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import useWuPageStore from "@/Store/useWuPageStore"
import useWuzzStore from "@/Store/useWuzzStore"
import showSelect from "./Dialog/showSelect"
import LeftRightPanel from "./Part/LeftRightPanel"
import WuView from "./Wu/WuView"

export default function WuPage() {
    const sSchemazzStore = useSchemazzStore()
    const sToastzzStore = useToastzzStore()
    const sWuzzStore = useWuzzStore()

    return (
        <div className="row">
            <LeftRightPanel
                makeCRUD={makeWuCRUD as any}
                onCreateClick={function () {
                    showSelect(
                        "Please select a Schema",
                        "",
                        makeNameMap(sSchemazzStore.itemzz),
                    )
                        .then((response) => {
                            if (response.isConfirmed) {
                                const found = sSchemazzStore.findByName(response.value)
                                if (found) {
                                    let name = found.name
                                    if (sWuzzStore.findByName(name)) {
                                        name += "-" + new Date().getTime()
                                    }
                                    return makeWuCRUD().create(makeWu(name, found.id))
                                }
                            }
                        })
                        .catch(sToastzzStore.showError)
                }}
                useItemPageStore={useWuPageStore}
                useItemzzStore={useWuzzStore}
                title="Wu"
            >
                <WuView></WuView>
            </LeftRightPanel>
        </div>
    )
}
