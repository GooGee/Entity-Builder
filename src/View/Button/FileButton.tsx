import writeFile from "@/Service/Generator/writeFile"
import useDirectoryzzStore from "@/Store/useDirectoryzzStore"
import usePsr4Store from "@/Store/usePsr4Store"
import useToastzzStore from "@/Store/useToastzzStore"
import EditButton from "./EditButton"

interface Property {
    action: string
    className?: string
    file: LB.File
    fullName?: boolean
    ma?: LB.ModuleAction
    module?: LB.Module
    schema: LB.Schema
}

export default function FileButton(property: Property) {
    const sDirectoryzzStore = useDirectoryzzStore()
    const sPsr4Store = usePsr4Store()
    const sToastzzStore = useToastzzStore()

    const name = sDirectoryzzStore.treeHelper.getFileName(
        property.file,
        property.schema,
        property.action,
    )
    const file = sDirectoryzzStore.treeHelper.getFileFullName(
        property.file,
        property.schema,
        property.action,
    )

    return (
        <div className={"btn-group " + property.className}>
            <button
                onClick={() => {
                    writeFile(
                        property.file,
                        property.schema,
                        property.module,
                        property.ma,
                        property.action,
                        sPsr4Store.psr4,
                    )
                        .then((response) =>
                            sToastzzStore.showSuccess(response.data.data),
                        )
                        .catch(sToastzzStore.showError)
                }}
                type="button"
                className="btn btn-outline-warning"
            >
                ▼
            </button>
            <EditButton
                content=""
                file={file}
                text={property.fullName ? file : name}
            ></EditButton>
        </div>
    )
}
