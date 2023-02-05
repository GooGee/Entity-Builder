import useEntityPageStore from "@/Store/useEntityPageStore"
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

export default function EntityView() {
    const sEntityPageStore = useEntityPageStore()

    const tabzz = Object.keys(TabEnum) as TabEnum[]

    if (sEntityPageStore.item === undefined) {
        return null
    }

    function makeView() {
        if (sEntityPageStore.item === undefined) {
            return null
        }

        if (sEntityPageStore.tab === TabEnum.Cast) {
            return <CastFieldList entity={sEntityPageStore.item}></CastFieldList>
        }
        if (sEntityPageStore.tab === TabEnum.Column) {
            return <ColumnList entity={sEntityPageStore.item}></ColumnList>
        }
        if (sEntityPageStore.tab === TabEnum.Detail) {
            return <Detail entity={sEntityPageStore.item}></Detail>
        }
        if (sEntityPageStore.tab === TabEnum.Factory) {
            return <Factory entity={sEntityPageStore.item}></Factory>
        }
        if (sEntityPageStore.tab === TabEnum.File) {
            return <FileList entity={sEntityPageStore.item}></FileList>
        }
        if (sEntityPageStore.tab === TabEnum.Index) {
            return <IndexList entity={sEntityPageStore.item}></IndexList>
        }
        if (sEntityPageStore.tab === TabEnum.Relation) {
            return <RelationList entity={sEntityPageStore.item}></RelationList>
        }
        if (sEntityPageStore.tab === TabEnum.Validation) {
            return <Validation entity={sEntityPageStore.item}></Validation>
        }
        return null
    }

    return (
        <div>
            <TabList
                tab={sEntityPageStore.tab}
                tabzz={tabzz}
                setTab={sEntityPageStore.setTab}
            ></TabList>

            {makeView()}
        </div>
    )
}
