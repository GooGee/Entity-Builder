import useDirectoryzzStore from "@/Store/useDirectoryzzStore"
import useFilezzStore from "@/Store/useFilezzStore"
import useFlowPageStore, { StepEnum } from "@/Store/useFlowPageStore"
import useModuleActionFilezzStore from "@/Store/useModuleActionFilezzStore"
import { useState } from "react"
import FileList from "../Entity/FileList"
import TabList from "../Part/TabList"
import FileView from "./FileView"

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
}

export default function FileTabList(property: Property) {
    const sDirectoryzzStore = useDirectoryzzStore()
    const sFilezzStore = useFilezzStore()
    const sFlowPageStore = useFlowPageStore()
    const sModuleActionFilezzStore = useModuleActionFilezzStore()

    const [tab, setTab] = useState<string>(TabEnum.Crud)

    const tabzz = Object.keys(TabEnum) as TabEnum[]

    if (property.step === Step) {
        // ok
    } else {
        const filezz = sModuleActionFilezzStore.itemzz.filter(
            (item) => item.moduleActionId === property.ma.id,
        )
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
                            <td>{getName(item)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }

    function getName(item: LB.ModuleActionFile) {
        const file = sFilezzStore.find(item.fileId)
        if (file === undefined) {
            return `-- file ${item.fileId} not found --`
        }

        return sDirectoryzzStore.treeHelper.getFileName(
            file,
            property.entity,
            property.action,
        )
    }

    return (
        <div>
            <h3>{Step}</h3>

            <TabList tab={tab} tabzz={tabzz} setTab={setTab}></TabList>

            {tab === TabEnum.All ? (
                <FileList entity={property.entity}></FileList>
            ) : null}

            {tab === TabEnum.Crud ? (
                <FileView
                    action={property.action}
                    directoryId={property.ma.directoryId}
                    isTest={false}
                    ma={property.ma}
                    module={property.module}
                    entity={property.entity}
                ></FileView>
            ) : null}

            {tab === TabEnum.Test ? (
                <FileView
                    action={property.action}
                    directoryId={property.ma.testDirectoryId}
                    isTest={true}
                    ma={property.ma}
                    module={property.module}
                    entity={property.entity}
                ></FileView>
            ) : null}
        </div>
    )
}
