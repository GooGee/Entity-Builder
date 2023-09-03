import useEntityPageStore from "@/Store/useEntityPageStore"
import useEntityzzStore from "@/Store/useEntityzzStore"
import useListModalStore from "@/Store/useListModalStore"
import useModulePageStore from "@/Store/useModulePageStore"
import PathList from "./PathList"
import ActionList from "./ActionList"
import ModuleList from "./ModuleList"

export default function FlowSideMenu() {
    const sEntityPageStore = useEntityPageStore()
    const sEntityzzStore = useEntityzzStore()

    const sListModalStore = useListModalStore()

    const sModulePageStore = useModulePageStore()

    function showEntityList() {
        const namezz = sEntityzzStore.itemzz.map((item) => item.name)
        sListModalStore.openCB("select an Entity", namezz, function (name) {
            const item = sEntityzzStore.findByName(name)
            if (item === undefined) {
                return
            }

            sEntityPageStore.setItem(item)
        })
    }

    return (
        <div className="d-flex flex-column py-3" style={{ gap: "2rem" }}>
            <div>
                <h3>Entity</h3>
                <div>
                    <button
                        onClick={showEntityList}
                        className="btn btn-outline-primary"
                        type="button"
                    >
                        {sEntityPageStore.item?.name ?? "-- select an Entity --"}
                    </button>
                </div>
            </div>

            <ModuleList></ModuleList>

            {sEntityPageStore.item === undefined ||
            sModulePageStore.item === undefined ? null : (
                <PathList
                    entity={sEntityPageStore.item}
                    module={sModulePageStore.item}
                ></PathList>
            )}

            {sEntityPageStore.item === undefined ||
            sModulePageStore.item === undefined ? null : (
                <ActionList
                    entity={sEntityPageStore.item}
                    module={sModulePageStore.item}
                ></ActionList>
            )}
        </div>
    )
}
