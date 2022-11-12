import { makeModuleActionCRUD } from "@/Database/makeCRUD"
import useToastzzStore from "@/Store/useToastzzStore"
import { useState } from "react"
import showConfirm from "../Dialog/showConfirm"
import ParameterList from "../Oapi/ParameterList"
import TabList from "../Part/TabList"
import ActionRequest from "./ActionRequest"
import Detail from "./Detail"
import FileView from "./FileView"
import ResponseList from "./ResponseList"
import RouteList from "./RouteList"

interface Property {
    item: LB.ModuleAction
    module: LB.Module
    name: string
    schema: LB.Schema
}

enum TabEnum {
    Detail = "Detail",
    File = "File",
    Test = "Test",
    Parameter = "Parameter",
    Request = "Request",
    Response = "Response",
    Route = "Route",
}

export default function Action(property: Property) {
    const sToastzzStore = useToastzzStore()

    const [tab, setTab] = useState<string>(TabEnum.Detail)

    const tabzz = Object.keys(TabEnum) as TabEnum[]

    function makeView() {
        if (tab === TabEnum.Detail) {
            return (
                <Detail
                    action={property.name}
                    item={property.item}
                    schema={property.schema}
                ></Detail>
            )
        }

        if (tab === TabEnum.File) {
            return (
                <FileView
                    action={property.name}
                    directoryId={property.item.directoryId}
                    isTest={false}
                    ma={property.item}
                    module={property.module}
                    schema={property.schema}
                ></FileView>
            )
        }
        if (tab === TabEnum.Test) {
            return (
                <FileView
                    action={property.name}
                    directoryId={property.item.testDirectoryId}
                    isTest={true}
                    ma={property.item}
                    module={property.module}
                    schema={property.schema}
                ></FileView>
            )
        }

        if (tab === TabEnum.Parameter) {
            return (
                <ParameterList
                    inPath={false}
                    inResponse={false}
                    targetId={property.item.id}
                ></ParameterList>
            )
        }

        if (tab === TabEnum.Request) {
            return (
                <ActionRequest
                    action={property.name}
                    item={property.item}
                    schema={property.schema}
                    update={function update(data) {
                        makeModuleActionCRUD()
                            .update(data)
                            .catch(sToastzzStore.showError)
                    }}
                ></ActionRequest>
            )
        }

        if (tab === TabEnum.Response) {
            return (
                <ResponseList
                    action={property.name}
                    item={property.item}
                    schema={property.schema}
                ></ResponseList>
            )
        }

        if (tab === TabEnum.Route) {
            return (
                <RouteList
                    action={property.name}
                    item={property.item}
                    module={property.module}
                    schema={property.schema}
                ></RouteList>
            )
        }
    }

    return (
        <div>
            <span
                onClick={() => {
                    showConfirm()
                        .then((response) => {
                            if (response.isConfirmed) {
                                return makeModuleActionCRUD().delete(property.item.id)
                            }
                        })
                        .catch(sToastzzStore.showError)
                }}
                className="btn btn-outline-primary danger mb-3"
            >
                - {property.name}
            </span>

            <TabList tab={tab} tabzz={tabzz} setTab={setTab}></TabList>

            {makeView()}
        </div>
    )
}
