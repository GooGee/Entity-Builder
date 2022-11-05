import { makePathFor } from "@/Database/Factory/makePath"
import { makeParameterMapCRUD, makePathCRUD } from "@/Database/makeCRUD"
import useFilezzStore from "@/Store/useFilezzStore"
import usePathzzStore from "@/Store/usePathzzStore"
import { useEffect, useState } from "react"
import FileButton from "../Button/FileButton"
import PathDetail from "../Oapi/PathDetail"

interface Property {
    action: string
    item: LB.ModuleAction
    module: LB.Module
    schema: LB.Schema
}

export default function RouteList(property: Property) {
    const sFilezzStore = useFilezzStore()
    const sPathzzStore = usePathzzStore()

    const [tab, setTab] = useState<LB.Path>()

    const api = sFilezzStore.itemzz.find((item) => item.name === "api.php")
    const web = sFilezzStore.itemzz.find((item) => item.name === "web.php")

    const routezz = sPathzzStore.itemzz.filter(
        (item) =>
            item.moduleId === property.module.id &&
            item.schemaId === property.schema.id,
    )

    useEffect(() => {
        setTab(undefined)
    }, [property.module, property.schema])

    function getCN(id: number) {
        let cn = "nav-link"
        if (tab) {
            if (tab.id === id) {
                cn += " active"
                return cn
            }
        }
        return cn
    }

    return (
        <div>
            <ul className="nav nav-tabs mb-3">
                {routezz.map((item) => (
                    <li
                        key={item.id}
                        onClick={function () {
                            setTab(item)
                        }}
                        className="nav-item nav-item-fill"
                    >
                        <span className={getCN(item.id)}>{item.name}</span>
                    </li>
                ))}

                <li className="nav-item">
                    <button
                        className="btn btn-outline-primary ms-3"
                        type="button"
                        onClick={function () {
                            const path = makePathFor(
                                property.schema,
                                property.module,
                                sPathzzStore.itemzz,
                            )
                            return makePathCRUD()
                                .create(path)
                                .then(function (response) {
                                    if (path.name.includes("/{id}")) {
                                        return makeParameterMapCRUD().create({
                                            inPath: true,
                                            inResponse: false,
                                            parameterId: 1000,
                                            targetId: response.id,
                                        })
                                    }
                                })
                        }}
                    >
                        +
                    </button>
                </li>

                <li className="nav-item">
                    {api === undefined ? (
                        <span className="text-danger ms-3">File api.php not found</span>
                    ) : (
                        <FileButton
                            action={""}
                            className="ms-3"
                            file={api}
                            fullName
                            schema={property.schema}
                        ></FileButton>
                    )}
                    {web === undefined ? (
                        <span className="text-danger ms-3">File web.php not found</span>
                    ) : (
                        <FileButton
                            action={""}
                            className="ms-3"
                            file={web}
                            fullName
                            schema={property.schema}
                        ></FileButton>
                    )}
                </li>
            </ul>

            {tab === undefined ? null : (
                <PathDetail
                    item={tab}
                    schema={property.schema}
                    onDelete={function () {
                        setTab(undefined)
                    }}
                ></PathDetail>
            )}
        </div>
    )
}
