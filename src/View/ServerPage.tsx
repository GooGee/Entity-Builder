import makeSideBarItem from "@/Database/Factory/makeSideBarItem"
import { makeServerCRUD } from "@/Database/makeCRUD"
import useServerzzStore from "@/Store/useServerzzStore"
import useToastzzStore from "@/Store/useToastzzStore"
import WebLink from "./Button/WebLink"
import showInput from "./Dialog/showInput"
import ServerDetail from "./Oapi/ServerDetail"

export default function ServerPage() {
    const sServerzzStore = useServerzzStore()
    const sToastzzStore = useToastzzStore()

    return (
        <div className="row">
            <div className="col">
                <table className="table">
                    <caption>
                        <h1 className="inline me-3">Server</h1>
                        <button
                            onClick={function () {
                                showInput("Please input server URI", "https://")
                                    .then((response) => {
                                        if (response.isConfirmed) {
                                            const data = makeSideBarItem(
                                                response.value,
                                            ) as LB.Server
                                            data.global = true
                                            return makeServerCRUD().create(data)
                                        }
                                    })
                                    .catch(sToastzzStore.showError)
                            }}
                            className="btn btn-outline-primary"
                            type="button"
                        >
                            +
                        </button>

                        <WebLink
                            className="ms-3"
                            href="https://spec.openapis.org/oas/v3.0.3#server-object"
                        >
                            doc
                        </WebLink>
                    </caption>
                    <thead>
                        <tr>
                            <th>global / URI</th>
                            <th>variable</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sServerzzStore.itemzz.map((item) => (
                            <ServerDetail item={item} key={item.id}></ServerDetail>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={2}>
                                only global servers will be added to `servers` object of
                                OpenApi document. non-global servers are for path /
                                operation.
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}
