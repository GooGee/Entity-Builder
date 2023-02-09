import Constant from "@/Model/Constant"
import {
    getFileFullNameInCode,
    getCodeFileName,
    ScriptExtention,
    TemplateExtention,
} from "@/Model/FileManager"
import makeKeywordRE from "@/Service/makeKeywordRE"
import useDirectoryzzStore from "@/Store/useDirectoryzzStore"
import useEntityPageStore from "@/Store/useEntityPageStore"
import useFilezzStore from "@/Store/useFilezzStore"
import useFlowPageStore from "@/Store/useFlowPageStore"
import { useState, useEffect } from "react"
import ColorButtonGroup from "../Button/ColorButtonGroup"
import EditButton from "../Button/EditButton"
import FileButton from "../Button/FileButton"

interface Property {
    entity: LB.Entity
}

export default function FileList(property: Property) {
    const sDirectoryzzStore = useDirectoryzzStore()
    const sFlowPageStore = useFlowPageStore()
    const sFilezzStore = useFilezzStore()
    const sEntityPageStore = useEntityPageStore()

    const [filezz, setFilezz] = useState<LB.File[]>([])
    const [text, setText] = useState("")

    useEffect(() => {
        if (text.length) {
            const re = makeKeywordRE(text)
            setFilezz(
                sFilezzStore.itemzz
                    .filter((item) => item.name.match(re))
                    .sort((aa, bb) => {
                        if (aa.directoryId === bb.directoryId) {
                            return aa.name.localeCompare(bb.name)
                        }
                        return aa.directoryId - bb.directoryId
                    }),
            )
            return
        }
        if (sEntityPageStore.fileColor === "#fff") {
            setFilezz(sFilezzStore.itemzz)
            return
        }
        setFilezz(
            sFilezzStore.itemzz
                .filter((item) => item.color === sEntityPageStore.fileColor)
                .sort((aa, bb) => {
                    if (aa.directoryId === bb.directoryId) {
                        return aa.name.localeCompare(bb.name)
                    }
                    return aa.directoryId - bb.directoryId
                }),
        )
    }, [sEntityPageStore.fileColor, text])

    function getName(item: LB.File) {
        const name = sDirectoryzzStore.treeHelper.getFileFullName(
            item,
            property.entity,
            "",
        )
        const index = name.lastIndexOf("/")
        if (index === -1) {
            return "/"
        }

        return name.slice(0, index)
    }

    return (
        <table className="table table-sm">
            <caption>
                <h3 className="inline me-3">File</h3>
                <span>generate files</span>
                <ColorButtonGroup
                    color={sEntityPageStore.fileColor}
                    setColor={(color) => sEntityPageStore.setFileColor(color)}
                ></ColorButtonGroup>
                <input
                    className="form-control"
                    value={text}
                    onChange={function (event) {
                        setText(event.target.value)
                    }}
                    type="text"
                />
            </caption>
            <thead>
                <tr>
                    <td className="w333">edit script / template</td>
                    <td>file</td>
                </tr>
            </thead>

            <tbody>
                {filezz.map((item) => (
                    <tr key={item.id}>
                        <td>
                            <div className="btn-group me-2">
                                <EditButton
                                    file={getFileFullNameInCode(
                                        getCodeFileName(item, ScriptExtention),
                                    )}
                                    content={Constant.ScriptCode}
                                ></EditButton>
                                <EditButton
                                    file={getFileFullNameInCode(
                                        getCodeFileName(item, TemplateExtention),
                                    )}
                                    content=""
                                ></EditButton>
                            </div>
                            {item.name}
                        </td>
                        <td>
                            <div>{getName(item)}</div>
                            <FileButton
                                action=""
                                file={item}
                                entity={property.entity}
                                module={sFlowPageStore.module}
                            ></FileButton>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
