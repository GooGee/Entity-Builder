import { makeModuleActionCRUD } from "@/Database/makeCRUD"
import useModulezzStore from "@/Store/useModulezzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import { ReactElement, useEffect, useState } from "react"
import SelectMapButton from "../Button/SelectMapButton"
import useModuleActionzzStore from "@/Store/useModuleActionzzStore"

interface Property {
    action: string
    children?: ReactElement
    entity: LB.Entity
    ma: LB.ModuleAction
}

export default function ActionDetail(property: Property) {
    const suseModulezzStore = useModulezzStore()
    const sToastzzStore = useToastzzStore()

    const [item, setItem] = useState(property.ma)
    const [ModuleId, setModuleId] = useState(property.ma.moduleId)

    useEffect(() => {
        setItem(property.ma)
    }, [property.ma])

    function update(data: LB.ModuleAction) {
        setItem(data)
        makeModuleActionCRUD().update(data).then(setItem).catch(sToastzzStore.showError)
    }

    return (
        <table className="table td0-tar">
            <caption>{property.children}</caption>
            <tbody>
                <tr>
                    <td>deprecated</td>
                    <td>
                        <div className="form-check form-switch">
                            <input
                                checked={item.deprecated}
                                onChange={(event) =>
                                    update({
                                        ...item,
                                        deprecated: event.target.checked,
                                    })
                                }
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id={"deprecatedSwitchCheck" + item.id}
                            />
                            <label className="form-check-label" htmlFor={"deprecatedSwitchCheck" + item.id}></label>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>summary</td>
                    <td>
                        <input
                            value={item.summary}
                            onChange={(event) =>
                                update({
                                    ...item,
                                    summary: event.target.value,
                                })
                            }
                            type="text"
                            className="form-control"
                        />
                    </td>
                </tr>
                <tr>
                    <td>routeName</td>
                    <td>
                        <input
                            value={item.routeName}
                            onChange={(event) =>
                                update({
                                    ...item,
                                    routeName: event.target.value,
                                })
                            }
                            type="text"
                            className="form-control"
                        />
                    </td>
                </tr>
                <tr>
                    <td>description</td>
                    <td>
                        <textarea
                            value={item.description}
                            onChange={(event) =>
                                update({
                                    ...item,
                                    description: event.target.value,
                                })
                            }
                            className="form-control"
                        ></textarea>
                    </td>
                </tr>

                <tr>
                    <td>move to</td>
                    <td>
                        <SelectMapButton
                            className="inline wa"
                            itemzz={suseModulezzStore.itemzz.map((item) => [item.id, item.name])}
                            value={ModuleId}
                            change={(value) => setModuleId(Number(value))}
                        />

                        <button
                            className="btn btn-outline-warning mx-3"
                            disabled={property.ma.moduleId === ModuleId}
                            type="button"
                            onClick={function () {
                                if (confirm("Are you sure?")) {
                                    const module = suseModulezzStore.find(ModuleId)
                                    if (module == null) {
                                        sToastzzStore.showDanger(`ModuleId ${ModuleId} not found`)
                                        return
                                    }

                                    const found = useModuleActionzzStore
                                        .getState()
                                        .itemzz.find((item) => item.name === item.name)
                                    if (found) {
                                        sToastzzStore.showDanger(
                                            `Action ${item.name} already exists in Module ${module.name}.`,
                                        )
                                        return
                                    }

                                    update({
                                        ...item,
                                        moduleId: ModuleId,
                                        directoryId: module.directoryId,
                                    })
                                }
                            }}
                        >
                            move
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
