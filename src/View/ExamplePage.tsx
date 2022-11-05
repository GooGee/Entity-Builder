import makeExample from "@/Database/Factory/makeExample"
import { makeExampleCRUD } from "@/Database/makeCRUD"
import useExamplePageStore from "@/Store/useExamplePageStore"
import useExamplezzStore from "@/Store/useExamplezzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import ExampleDetail from "./Oapi/ExampleDetail"
import LeftRightPanel from "./Part/LeftRightPanel"

export default function ExamplePage() {
    const sExamplePageStore = useExamplePageStore()
    const sToastzzStore = useToastzzStore()

    return (
        <div className="row">
            <LeftRightPanel
                makeCRUD={makeExampleCRUD as any}
                useItemPageStore={useExamplePageStore}
                useItemzzStore={useExamplezzStore}
                title="Example"
                validateName={false}
                onCreate={function (name) {
                    makeExampleCRUD()
                        .create(makeExample(name))
                        .catch(sToastzzStore.showError)
                }}
            >
                {sExamplePageStore.item ? (
                    <ExampleDetail item={sExamplePageStore.item}></ExampleDetail>
                ) : undefined}
            </LeftRightPanel>
        </div>
    )
}
