import useDirectoryzzStore from "@/Store/useDirectoryzzStore"
import useFlowPageStore, { StepEnum } from "@/Store/useFlowPageStore"
import { useState } from "react"
import FileButton from "../Button/FileButton"
import FileList from "../Entity/FileList"
import TabList from "../Part/TabList"
import FileView from "./FileView"
import RacFileList from "./RacFileList"

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
    const sDirectoryzzStore = useDirectoryzzStore()
    const sFlowPageStore = useFlowPageStore()

    const [tab, setTab] = useState<string>(TabEnum.Crud)

    const tabzz = Object.keys(TabEnum) as TabEnum[]

    if (property.step === Step) {
        // ok
    } else {
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
                    {property.ma.filezz
                        .sort((aa, bb) => {
                            if (aa.directoryId === bb.directoryId) {
                                const namea = sDirectoryzzStore.treeHelper.getFileName(
                                    aa,
                                    property.entity,
                                    property.action,
                                )
                                const nameb = sDirectoryzzStore.treeHelper.getFileName(
                                    bb,
                                    property.entity,
                                    property.action,
                                )
                                return namea.localeCompare(nameb)
                            }
                            return aa.directoryId - bb.directoryId
                        })
                        .map((item) => (
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
                    directoryId={property.module.directoryId}
                    entity={property.entity}
                    isTest={false}
                    ma={property.ma}
                    module={property.module}
                ></FileView>
            ) : null}

            {tab === TabEnum.Test ? (
                <FileView
                    action={property.action}
                    directoryId={property.module.testDirectoryId}
                    entity={property.entity}
                    isTest={true}
                    ma={property.ma}
                    module={property.module}
                ></FileView>
            ) : null}

            {tab === TabEnum.View ? (
                <RacFileList
                    entity={property.entity}
                    ma={property.ma}
                    module={property.module}
                ></RacFileList>
            ) : null}
        </div>
    )
}
