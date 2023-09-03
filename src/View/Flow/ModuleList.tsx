import makeModule from "@/Database/Factory/makeModule"
import { makeModuleCRUD } from "@/Database/makeCRUD"
import useModulePageStore from "@/Store/useModulePageStore"
import useModulezzStore from "@/Store/useModulezzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import showInput from "../Dialog/showInput"
import ListGroup from "../Part/ListGroup"

export default function ModuleList() {
    return (
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
                                                .catch(
                                                    useToastzzStore.getState()
                                                        .showError,
                                                )
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

            <ListGroup
                item={useModulePageStore.getState().item}
                itemzz={useModulezzStore.getState().itemzz}
                select={(item: LB.Module) =>
                    useModulePageStore.getState().setItem(item)
                }
            ></ListGroup>
        </div>
    )
}
