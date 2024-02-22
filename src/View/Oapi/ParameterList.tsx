import { makeParameterMapCRUD } from "@/Database/makeCRUD"
import { makeIdNameMap } from "@/Factory/makeMap"
import { PageEnum } from "@/menuzz"
import { getLocation, getParameterzz } from "@/Service/getParameter"
import useToastzzStore from "@/Store/useToastzzStore"
import { useEffect, useState } from "react"

interface Property {
    pathId?: number
    requestId?: number
    responseId?: number
}

export default function ParameterList(property: Property) {
    const sToastzzStore = useToastzzStore()

    const [itemzz, setItemzz] = useState<LB.ParameterMap[]>([])

    const data = {
        pathId: property.pathId ?? null,
        requestId: property.requestId ?? null,
        responseId: property.responseId ?? null,
    }

    const columnzz = getItemzz()
    const nameMap = makeIdNameMap(columnzz)

    useEffect(() => {
        refresh()
    }, [property.pathId, property.requestId, property.responseId])

    function getItemzz() {
        if (property.responseId) {
            return getParameterzz(PageEnum.ParameterInHeader)
        }

        return [
            ...getParameterzz(PageEnum.ParameterInCookie),
            ...getParameterzz(PageEnum.ParameterInHeader),
            ...getParameterzz(PageEnum.ParameterInPath),
            ...getParameterzz(PageEnum.ParameterInQuery),
        ]
    }

    function makeOptionzz(page: PageEnum) {
        return (
            <>
                <option value={page} disabled>
                    -- {getLocation(page)} --
                </option>
                {getParameterzz(page).map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                ))}
            </>
        )
    }

    function refresh() {
        makeParameterMapCRUD()
            .findAll()
            .then((response) =>
                setItemzz(
                    response.filter(function (item) {
                        return (
                            item.pathId === data.pathId &&
                            item.requestId === data.requestId &&
                            item.responseId === data.responseId
                        )
                    }),
                ),
            )
            .catch(sToastzzStore.showError)
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>
                        <select
                            className="form-select wa"
                            value={0}
                            onChange={function (event) {
                                const columnId = parseInt(event.target.value)
                                makeParameterMapCRUD()
                                    .create({
                                        alias: "",
                                        columnId,
                                        pathId: data.pathId,
                                        requestId: data.requestId,
                                        responseId: data.responseId,
                                    })
                                    .then(refresh)
                                    .catch(sToastzzStore.showError)
                            }}
                        >
                            <option value={0} disabled hidden>
                                -- add --
                            </option>

                            {makeOptionzz(PageEnum.ParameterInHeader)}

                            {property.responseId ? null : (
                                <>
                                    {makeOptionzz(PageEnum.ParameterInCookie)}
                                    {makeOptionzz(PageEnum.ParameterInPath)}
                                    {makeOptionzz(PageEnum.ParameterInQuery)}
                                </>
                            )}
                        </select>
                    </th>
                    <th className="align-middle">alias</th>
                </tr>
            </thead>
            <tbody>
                {itemzz.map((item) => (
                    <tr key={item.id} className="mb-1">
                        <td>
                            <div className="input-group">
                                <button
                                    className="btn btn-outline-danger"
                                    type="button"
                                    onClick={function () {
                                        makeParameterMapCRUD()
                                            .delete(item.id)
                                            .then(refresh)
                                            .catch(sToastzzStore.showError)
                                    }}
                                >
                                    -
                                </button>
                                <button className="btn btn-outline-secondary" type="button">
                                    {nameMap.get(item.columnId) ?? "-- not found --"}
                                </button>
                            </div>
                        </td>
                        <td>
                            <input
                                className="form-control"
                                type="text"
                                value={item.alias}
                                onChange={function (event) {
                                    makeParameterMapCRUD()
                                        .update({
                                            ...item,
                                            alias: event.target.value,
                                        })
                                        .then(refresh)
                                        .catch(sToastzzStore.showError)
                                }}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
