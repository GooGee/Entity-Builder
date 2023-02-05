import useOapiStore from "@/Store/useOapiStore"

export default function ContactDetail() {
    const item = useOapiStore((item) => item.info.contact!)
    const sOapiStore = useOapiStore()

    return (
        <table className="table td0-tar">
            <tbody>
                <tr>
                    <td className="w222">email</td>
                    <td>
                        <input
                            value={item.email}
                            onChange={(event) =>
                                sOapiStore.setContact({
                                    ...item,
                                    email: event.target.value,
                                })
                            }
                            className="form-control"
                            type="text"
                        />
                    </td>
                </tr>
                <tr>
                    <td>name</td>
                    <td>
                        <input
                            value={item.name}
                            onChange={(event) =>
                                sOapiStore.setContact({
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
                                sOapiStore.setContact({
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
