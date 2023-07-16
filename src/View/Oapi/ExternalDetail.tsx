import useOapiStore from "@/Store/useOapiStore"

export default function ExternalDetail() {
    const item = useOapiStore((item) => item.externalDocs)
    const sOapiStore = useOapiStore()

    return (
        <table className="table td0-tar">
            <tbody>
                <tr>
                    <td className="w222">url</td>
                    <td>
                        <input
                            value={item.url}
                            onChange={(event) =>
                                sOapiStore.setExternal({
                                    ...item,
                                    url: event.target.value,
                                })
                            }
                            className="form-control"
                            type="text"
                        />
                    </td>
                </tr>
                <tr>
                    <td>description</td>
                    <td>
                        <textarea
                            rows={3}
                            value={item.description}
                            onChange={(event) =>
                                sOapiStore.setExternal({
                                    ...item!,
                                    description: event.target.value,
                                })
                            }
                            className="form-control"
                        ></textarea>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
