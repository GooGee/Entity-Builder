import { cloneFile } from "@/Database/Factory/makeFile"
import LayerEnum from "@/Model/LayerEnum"
import useFilezzStore from "@/Store/useFilezzStore"
import useFlowPageStore, { StepEnum } from "@/Store/useFlowPageStore"
import useModuleActionFilezzStore from "@/Store/useModuleActionFilezzStore"
import { useState } from "react"
import FileButton from "../Button/FileButton"
import FileList from "../Entity/FileList"
import TabList from "../Part/TabList"
import FileView from "./FileView"
import ViewFileList from "./ViewFileList"

const Step = StepEnum.File

interface Property {
    action: string
    entity: LB.Entity
    ma: LB.ModuleAction
    module: LB.Module
    step: string
}

enum TabEnum {
    All = "All",
    Crud = "Crud",
    Test = "Test",
    View = "View",
}

export default function FileTabList(property: Property) {
    const sFilezzStore = useFilezzStore()
    const sFlowPageStore = useFlowPageStore()
    const sModuleActionFilezzStore = useModuleActionFilezzStore()

    const [tab, setTab] = useState<string>(TabEnum.Crud)

    const tabzz = Object.keys(TabEnum) as TabEnum[]

    if (property.step === Step) {
        // ok
    } else {
        const set = new Set(
            sModuleActionFilezzStore.itemzz
                .filter((item) => item.moduleActionId === property.ma.id)
                .map((item) => item.fileId),
        )
        const filezz = sFilezzStore.itemzz
            .filter((item) => set.has(item.id))
            .map((item) =>
                cloneFile(
                    item,
                    item.layer === LayerEnum.Test
                        ? property.ma.testDirectoryId
                        : property.ma.directoryId,
                ),
            )
            .sort((aa, bb) => {
                if (aa.layer === bb.layer) {
                    return aa.name.localeCompare(bb.name)
                }
                return aa.layer.localeCompare(bb.layer)
            })
        return (
            <table className="table">
                <caption>
                    <h3
                        className="pointer hover-blue"
                        onClick={() => sFlowPageStore.setStep(Step)}
                    >
                        {Step}
                    </h3>
                </caption>
                <tbody>
                    {filezz.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <FileButton
                                    action={property.action}
                                    file={item}
                                    fullName
                                    ma={property.ma}
                                    entity={property.entity}
                                ></FileButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }

    return (
        <div>
            <h3>{Step}</h3>

            <TabList tab={tab} tabzz={tabzz} setTab={setTab}></TabList>

            {tab === TabEnum.All ? (
                <FileList
                    entity={property.entity}
                    ma={property.ma}
                    module={property.module}
                ></FileList>
            ) : null}

            {tab === TabEnum.Crud ? (
                <FileView
                    action={property.action}
                    directoryId={property.ma.directoryId}
                    entity={property.entity}
                    isTest={false}
                    ma={property.ma}
                    module={property.module}
                ></FileView>
            ) : null}

            {tab === TabEnum.Test ? (
                <FileView
                    action={property.action}
                    directoryId={property.ma.testDirectoryId}
                    entity={property.entity}
                    isTest={true}
                    ma={property.ma}
                    module={property.module}
                ></FileView>
            ) : null}

            {tab === TabEnum.View ? (
                <ViewFileList
                    entity={property.entity}
                    ma={property.ma}
                    module={property.module}
                ></ViewFileList>
            ) : null}
        </div>
    )
}
