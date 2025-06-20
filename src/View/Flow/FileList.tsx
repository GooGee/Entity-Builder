import { makeModuleActionCRUD } from "@/Database/makeCRUD"
import { makeIdItemMap } from "@/Factory/makeMap"
import Constant from "@/Model/Constant"
import { getFileFullNameInCode, getCodeFileName, ScriptExtention, TemplateExtention } from "@/Model/FileManager"
import useFilezzStore from "@/Store/useFilezzStore"
import useFlowPageStore from "@/Store/useFlowPageStore"
import useListModalStore from "@/Store/useListModalStore"
import useToastzzStore from "@/Store/useToastzzStore"
import EditButton from "../Button/EditButton"
import FileButton from "../Button/FileButton"
import showInput from "../Dialog/showInput"
import FileFilterList from "./FileFilterList"

interface Property {
    action: string
    directoryId: number
    isTest: boolean
    ma: LB.ModuleAction
    module: LB.Module
    entity: LB.Entity
}

export default function FileList(property: Property) {
    const sFlowPageStore = useFlowPageStore()
    const sToastzzStore = useToastzzStore()

    const xFilezz = property.ma.filezz.filter((item) => item.isExtra && item.directoryId === property.directoryId)

    return (
        <tbody>
            {xFilezz.map(function (item) {
                return (
                    <tr key={item.id}>
                        <td></td>
                        <td>
                            <button
                                onClick={function () {
                                    makeModuleActionCRUD()
                                        .update({
                                            ...property.ma,
                                            filezz: property.ma.filezz.filter((one) => one.id !== item.id),
                                        })
                                        .then((item) => sFlowPageStore.setAction(item.name, item))
                                        .catch(sToastzzStore.showError)
                                }}
                                className="btn btn-outline-danger"
                                type="button"
                            >
                                -
                            </button>
                            <FileButton
                                action={property.action}
                                className="ms-3"
                                entity={property.entity}
                                file={item}
                                ma={property.ma}
                                module={property.module}
                            ></FileButton>
                        </td>
                    </tr>
                )
            })}

            <FileFilterList
                directoryId={property.directoryId}
                entity={property.entity}
                isTest={property.isTest}
                ma={property.ma}
            ></FileFilterList>
        </tbody>
    )
}
