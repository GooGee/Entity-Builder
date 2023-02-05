import useEntityPageStore from "@/Store/useEntityPageStore"
import useFlowPageStore, { StepEnum } from "@/Store/useFlowPageStore"
import ActionList from "./ActionList"
import ActionRequest from "./ActionRequest"
import FileTabList from "./FileTabList"
import ModuleList from "./ModuleList"
import PathList from "./PathList"
import ResponseList from "./ResponseList"

export default function FlowView() {
    const sEntityPageStore = useEntityPageStore()
    const sFlowPageStore = useFlowPageStore()

    if (sEntityPageStore.item === undefined) {
        return null
    }

    const stepzz = Object.keys(StepEnum) as StepEnum[]

    function makeView(title: string) {
        return <h3 className="pointer hover-blue c-secondary">{title}</h3>
    }

    return (
        <table className="table">
            <tbody>
                <tr>
                    <td rowSpan={6} style={{ width: "133px" }}>
                        <div className="position-fixed">
                            <ul className="list-group">
                                {stepzz.map((item) => (
                                    <li
                                        className={
                                            "list-group-item list-group-item-action pointer" +
                                            (sFlowPageStore.step === item
                                                ? " active"
                                                : "")
                                        }
                                        key={item}
                                        onClick={() => sFlowPageStore.setStep(item)}
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </td>
                    <td>
                        <ModuleList entity={sEntityPageStore.item}></ModuleList>
                    </td>
                </tr>

                <tr>
                    <td>
                        {sFlowPageStore.module ? (
                            <PathList
                                entity={sEntityPageStore.item}
                                module={sFlowPageStore.module}
                            ></PathList>
                        ) : (
                            makeView(StepEnum.Path)
                        )}
                    </td>
                </tr>

                <tr>
                    <td>
                        {sFlowPageStore.module ? (
                            <ActionList
                                entity={sEntityPageStore.item}
                                module={sFlowPageStore.module}
                            ></ActionList>
                        ) : (
                            makeView(StepEnum.Module)
                        )}
                    </td>
                </tr>

                <tr>
                    <td>
                        {sFlowPageStore.ma &&
                        sFlowPageStore.module &&
                        sFlowPageStore.path ? (
                            <ActionRequest
                                action={sFlowPageStore.action}
                                entity={sEntityPageStore.item}
                                ma={sFlowPageStore.ma}
                                step={sFlowPageStore.step}
                            ></ActionRequest>
                        ) : (
                            makeView(StepEnum.Request)
                        )}
                    </td>
                </tr>

                <tr>
                    <td>
                        {sFlowPageStore.ma &&
                        sFlowPageStore.module &&
                        sFlowPageStore.path ? (
                            <ResponseList
                                action={sFlowPageStore.action}
                                entity={sEntityPageStore.item}
                                ma={sFlowPageStore.ma}
                                step={sFlowPageStore.step}
                            ></ResponseList>
                        ) : (
                            makeView(StepEnum.Response)
                        )}
                    </td>
                </tr>

                <tr>
                    <td>
                        {sFlowPageStore.ma && sFlowPageStore.module ? (
                            <FileTabList
                                action={sFlowPageStore.action}
                                entity={sEntityPageStore.item}
                                ma={sFlowPageStore.ma}
                                module={sFlowPageStore.module}
                                step={sFlowPageStore.step}
                            ></FileTabList>
                        ) : (
                            makeView(StepEnum.File)
                        )}
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
