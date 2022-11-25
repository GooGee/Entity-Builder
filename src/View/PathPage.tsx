import useFilezzStore from "@/Store/useFilezzStore"
import useModulezzStore from "@/Store/useModulezzStore"
import usePathPageStore from "@/Store/usePathPageStore"
import usePathzzStore from "@/Store/usePathzzStore"
import useSchemazzStore from "@/Store/useSchemazzStore"
import FileButton from "./Button/FileButton"
import WebLink from "./Button/WebLink"
import PathDetail from "./Oapi/PathDetail"
import SideBar from "./Part/SideBar"

export default function PathPage() {
    const sFilezzStore = useFilezzStore()
    const sModulezzStore = useModulezzStore()
    const sPathPageStore = usePathPageStore()
    const sPathzzStore = usePathzzStore()
    const sSchemazzStore = useSchemazzStore()

    const module = sModulezzStore.find(sPathPageStore.moduleId)
    const schema = sSchemazzStore.itemzz[0]
    const api = sFilezzStore.itemzz.find((item) => item.name === "api.php")
    const web = sFilezzStore.itemzz.find((item) => item.name === "web.php")

    function makeDetail() {
        if (sPathPageStore.item === undefined) {
            return undefined
        }

        const schema = sSchemazzStore.find(sPathPageStore.item.schemaId)
        if (schema === undefined) {
            return undefined
        }
        return (
            <PathDetail
                item={sPathPageStore.item}
                schema={schema}
                onDelete={function () {
                    sPathPageStore.setItem(undefined)
                }}
            ></PathDetail>
        )
    }

    function makeView() {
        if (module === undefined) {
            return null
        }

        return (
            <>
                <SideBar
                    className="h100-module"
                    title="Path"
                    useStore={usePathPageStore}
                    itemzz={sPathzzStore.itemzz.filter(
                        (item) => item.moduleId === module.id,
                    )}
                ></SideBar>

                <div className="col-9 py-3 h100 h100-module overflow-auto ">
                    {makeDetail()}
                </div>
            </>
        )
    }

    return (
        <div className="row">
            <div className="col-12 mt-3">
                <div className="inline">
                    <ul className="nav nav-tabs">
                        <li className="nav-link disabled">Module</li>

                        {sModulezzStore.itemzz.map((item) => (
                            <li
                                key={item.id}
                                onClick={() => sPathPageStore.setModuleId(item.id)}
                                className="nav-item nav-item-fill"
                            >
                                <span
                                    className={
                                        item.id === module?.id
                                            ? "nav-link active"
                                            : "nav-link"
                                    }
                                >
                                    {item.name}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <WebLink
                    className="ms-5"
                    href="https://spec.openapis.org/oas/v3.0.3#paths-object"
                >
                    doc
                </WebLink>

                {api === undefined ? (
                    <span className="text-danger ms-3">File api.php not found</span>
                ) : (
                    <FileButton
                        action={""}
                        className="ms-3"
                        file={api}
                        fullName
                        schema={schema}
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
                        schema={schema}
                    ></FileButton>
                )}
            </div>

            {makeView()}
        </div>
    )
}
