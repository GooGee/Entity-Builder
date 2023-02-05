import useOapiStore from "@/Store/useOapiStore"

export default function InfoDetail() {
    const item = useOapiStore((item) => item.info)
    const sOapiStore = useOapiStore()

    return (
        <table className="table td0-tar">
            <tbody>
                <tr>
                    <td className="w222">title</td>
                    <td>
                        <input
                            value={item.title}
                            onChange={(event) =>
                                sOapiStore.setInfo({
                                    ...item,
                                    title: event.target.value,
                                })
                            }
                            className="form-control"
                            type="text"
                        />
                    </td>
                </tr>
                <tr>
                    <td>version</td>
                    <td>
                        <input
                            value={item.version}
                            onChange={(event) =>
                                sOapiStore.setInfo({
                                    ...item,
                                    version: event.target.value,
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
                                sOapiStore.setInfo({
                                    ...item!,
                                    description: event.target.value,
                                })
                            }
                            className="form-control"
                        ></textarea>
                    </td>
                </tr>
                <tr>
                    <td>termsOfService</td>
                    <td>
                        <textarea
                            rows={3}
                            value={item.termsOfService}
                            onChange={(event) =>
                                sOapiStore.setInfo({
                                    ...item!,
                                    termsOfService: event.target.value,
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
