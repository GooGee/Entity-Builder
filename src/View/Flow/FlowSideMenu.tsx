import useEntityPageStore from "@/Store/useEntityPageStore"
import useEntityzzStore from "@/Store/useEntityzzStore"
import useListModalStore from "@/Store/useListModalStore"
import useModulePageStore from "@/Store/useModulePageStore"
import useModulezzStore from "@/Store/useModulezzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import SelectButton from "@/View/Button/SelectButton"
import PathList from "./PathList"
import ActionList from "./ActionList"
import showInput from "../Dialog/showInput"
import { makeModuleCRUD } from "@/Database/makeCRUD"
import makeModule from "@/Database/Factory/makeModule"

export default function FlowSideMenu() {
    const sEntityPageStore = useEntityPageStore()
    const sEntityzzStore = useEntityzzStore()

    const sListModalStore = useListModalStore()

    const sModulePageStore = useModulePageStore()
    const sModulezzStore = useModulezzStore()

    const sToastzzStore = useToastzzStore()

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

            <div>
                <div className="d-flex">
                    <h3>Module</h3>

                    <div>
                        <button
                            className="btn btn-outline-primary ms-3"
                            type="button"
                            onClick={function () {
                                showInput("please input the module name", "").then(
                                    function (sar) {
                                        if (sar.isConfirmed) {
                                            if (sar.value) {
                                                makeModuleCRUD()
                                                    .create(makeModule(sar.value))
                                                    .catch(sToastzzStore.showError)
                                            }
                                        }
                                    },
                                )
                            }}
                        >
                            +
                        </button>
                    </div>
                </div>

                <div>
                    <SelectButton
                        itemzz={sModulezzStore.itemzz}
                        value={sModulePageStore.item?.id ?? 0}
                        change={function (id, item) {
                            sModulePageStore.setItem(item)
                        }}
                    ></SelectButton>
                </div>
            </div>

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
