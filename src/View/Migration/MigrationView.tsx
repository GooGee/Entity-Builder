import useSchemaPageStore from "@/Store/useSchemaPageStore"
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
    const sSchemaPageStore = useSchemaPageStore()

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
            {sSchemaPageStore.item === undefined ? null : (
                <div className="mb-5">
                    <FileButton
                        action={""}
                        file={property.file}
                        fullName
                        schema={sSchemaPageStore.item}
                    ></FileButton>
                </div>
            )}

            <TabList tab={tab} tabzz={tabzz} setTab={setTab}></TabList>

            {makeView()}
        </>
    )
}
