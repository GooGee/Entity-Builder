import useEntityPageStore from "@/Store/useEntityPageStore"
import { useState } from "react"
import FileButton from "../Button/FileButton"
import TabList from "../Part/TabList"
import TableList from "./TableList"
import VersionList from "./VersionList"

enum TabEnum {
    Database = "Database",
    Migration = "Migration",
}

interface Property {
    file: LB.File
}

export default function MigrationView(property: Property) {
    const sEntityPageStore = useEntityPageStore()

    const [tab, setTab] = useState<string>(TabEnum.Migration)

    const tabzz = Object.keys(TabEnum)

    function makeView() {
        if (tab === TabEnum.Migration) {
            return <VersionList></VersionList>
        }

        return <TableList></TableList>
    }

    return (
        <>
            {sEntityPageStore.item === undefined ? null : (
                <div className="mb-3">
                    <FileButton action={""} file={property.file} fullName entity={sEntityPageStore.item}></FileButton>
                </div>
            )}

            <TabList tab={tab} tabzz={tabzz} setTab={setTab}></TabList>

            {makeView()}
        </>
    )
}
