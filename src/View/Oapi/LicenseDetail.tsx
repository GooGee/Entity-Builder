import useOapiStore from "@/Store/useOapiStore"

export default function LicenseDetail() {
    const item = useOapiStore((item) => item.info.license!)
    const sOapiStore = useOapiStore()

    return (
        <table className="table table-text-right">
            <tbody>
                <tr>
                    <td className="w222">name</td>
                    <td>
                        <input
                            value={item.name}
                            onChange={(event) =>
                                sOapiStore.setLicense({
                                    ...item,
                                    name: event.target.value,
                                })
                            }
                            className="form-control"
                            type="text"
                        />
                    </td>
                </tr>
                <tr>
                    <td>url</td>
                    <td>
                        <input
                            value={item.url}
                            onChange={(event) =>
                                sOapiStore.setLicense({
                                    ...item,
                                    url: event.target.value,
                                })
                            }
                            className="form-control"
                            type="text"
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
