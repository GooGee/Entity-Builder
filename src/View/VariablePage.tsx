import { makeVariableCRUD } from "@/Database/makeCRUD"
import useVariablezzStore from "@/Store/useVariablezzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import VariableDetail from "./Oapi/VariableDetail"
import makeVariable from "@/Database/Factory/makeVariable"
import LeftRightPanel from "./Part/LeftRightPanel"
import useVariablePageStore from "@/Store/useVariablePageStore"
import { PageEnum } from "@/menuzz"
import ImportModal from "./Modal/ImportModal"

export default function VariablePage() {
    const sVariablePageStore = useVariablePageStore()
    const sToastzzStore = useToastzzStore()

    return (
        <div className="row">
            <LeftRightPanel
                makeCRUD={makeVariableCRUD as any}
                useItemPageStore={useVariablePageStore}
                useItemzzStore={useVariablezzStore}
                title={PageEnum.Enum}
                validateName={false}
                onCreate={function (name) {
                    makeVariableCRUD().create(makeVariable(name)).catch(sToastzzStore.showError)
                }}
            >
                {sVariablePageStore.item ? <VariableDetail item={sVariablePageStore.item}></VariableDetail> : undefined}
            </LeftRightPanel>

            <ImportModal></ImportModal>
        </div>
    )
}
