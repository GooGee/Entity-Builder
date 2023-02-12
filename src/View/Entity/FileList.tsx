import makeKeywordRE from "@/Service/makeKeywordRE"
import useEntityPageStore from "@/Store/useEntityPageStore"
import useFilezzStore from "@/Store/useFilezzStore"
import { useState, useEffect } from "react"
import ColorButtonGroup from "../Button/ColorButtonGroup"
import FileItem from "./FileItem"

interface Property {
    entity: LB.Entity
    ma?: LB.ModuleAction
    module?: LB.Module
}

export default function FileList(property: Property) {
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
                    <FileItem
                        entity={property.entity}
                        item={item}
                        key={item.id}
                        ma={property.ma}
                        module={property.module}
                    ></FileItem>
                ))}
            </tbody>
        </table>
    )
}
