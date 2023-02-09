import { makeParameterMapCRUD } from "@/Database/makeCRUD"
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

    useEffect(() => {
        refresh()
    }, [property.pathId, property.requestId, property.responseId])

    function getAlias(item: LB.ParameterMap) {
        if (item.alias) {
            return item.alias
        }

        const column = columnzz.find((column) => column.id === item.columnId)
        if (column) {
            return column.name
        }
        return ""
    }

    function getItemzz() {
        if (property.responseId) {
            return getParameterzz(PageEnum.Header)
        }

        return [
            ...getParameterzz(PageEnum.ParameterInCookie),
            ...getParameterzz(PageEnum.Header),
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
        <ul className="list-unstyled">
            <li className="mb-1">
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

                    {makeOptionzz(PageEnum.Header)}

                    {property.responseId ? null : (
                        <>
                            {makeOptionzz(PageEnum.ParameterInCookie)}
                            {makeOptionzz(PageEnum.ParameterInPath)}
                            {makeOptionzz(PageEnum.ParameterInQuery)}
                        </>
                    )}
                </select>
            </li>
            {itemzz.map((item) => (
                <li key={item.id} className="mb-1">
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
                        <input
                            className="form-control"
                            placeholder={getAlias(item)}
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
                    </div>
                </li>
            ))}
        </ul>
    )
}
