import useSchemaPageStore from "@/Store/useSchemaPageStore"
import TabList from "../Part/TabList"
import CastFieldList from "./CastFieldList"
import ColumnList from "./ColumnList"
import Detail from "./Detail"
import Factory from "./Factory"
import FileList from "./FileList"
import IndexList from "./IndexList"
import RelationList from "./RelationList"
import Validation from "./Validation"

enum TabEnum {
    Cast = "Cast",
    Column = "Column",
    Detail = "Detail",
    Factory = "Factory",
    File = "File",
    Index = "Index",
    Relation = "Relation",
    Validation = "Validation",
}

interface Property {
    schema: LB.Schema
}

export default function SchemaSetting(property: Property) {
    const sSchemaPageStore = useSchemaPageStore()

    const tabzz = Object.keys(TabEnum) as TabEnum[]

    function makeView() {
        if (sSchemaPageStore.settingTab === TabEnum.Cast) {
            return <CastFieldList schema={property.schema}></CastFieldList>
        }
        if (sSchemaPageStore.settingTab === TabEnum.Column) {
            return <ColumnList schema={property.schema}></ColumnList>
        }
        if (sSchemaPageStore.settingTab === TabEnum.Detail) {
            return <Detail schema={property.schema}></Detail>
        }
        if (sSchemaPageStore.settingTab === TabEnum.Factory) {
            return <Factory schema={property.schema}></Factory>
        }
        if (sSchemaPageStore.settingTab === TabEnum.File) {
            return <FileList schema={property.schema}></FileList>
        }
        if (sSchemaPageStore.settingTab === TabEnum.Index) {
            return <IndexList schema={property.schema}></IndexList>
        }
        if (sSchemaPageStore.settingTab === TabEnum.Relation) {
            return <RelationList schema={property.schema}></RelationList>
        }
        if (sSchemaPageStore.settingTab === TabEnum.Validation) {
            return <Validation schema={property.schema}></Validation>
        }
        return null
    }

    return (
        <div>
            <TabList
                tab={sSchemaPageStore.settingTab}
                tabzz={tabzz}
                setTab={sSchemaPageStore.setSettingTab}
            ></TabList>

            {makeView()}
        </div>
    )
}
