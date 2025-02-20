import useFilezzStore from "@/Store/useFilezzStore"
import { useEffect, useState } from "react"
import ColorButtonGroup from "../Button/ColorButtonGroup"
import ColorEnum from "@/Model/ColorEnum"
import { makeModuleActionCRUD } from "@/Database/makeCRUD"
import showInput from "../Dialog/showInput"
import useFlowPageStore from "@/Store/useFlowPageStore"
import useToastzzStore from "@/Store/useToastzzStore"

interface Property {
    directoryId: number
    isTest: boolean
    ma: LB.ModuleAction
    entity: LB.Entity
}

export default function FileFilterList(property: Property) {
    const suseFilezzStore = useFilezzStore()
    const sFlowPageStore = useFlowPageStore()
    const sToastzzStore = useToastzzStore()

    const found = suseFilezzStore.itemzz.find(
        (item) => item.name.startsWith(property.ma.name) && item.color !== ColorEnum.white,
    )

    const [Color, setColor] = useState<string>(found?.color ?? ColorEnum.red)
    const [Text, setText] = useState(property.ma.name)

    useEffect(() => {
        setColor(found?.color ?? ColorEnum.red)
        setText(property.ma.name)
    }, [property.ma.id])

    return (
        <>
            <tr>
                <td colSpan={2}>
                    <div>
                        <button
                            className="btn btn-outline-danger m-1"
                            onClick={function () {
                                setText("")
                            }}
                        >
                            X
                        </button>
                        <input
                            value={Text}
                            onChange={function (event) {
                                setText(event.target.value)
                            }}
                            className="form-control inline wa"
                            placeholder="filter by name"
                            type="text"
                        />
                    </div>

                    <ColorButtonGroup color={Color} setColor={setColor}></ColorButtonGroup>
                </td>
            </tr>

            {suseFilezzStore.itemzz
                .filter(function (item) {
                    if (Text) {
                        return item.name.includes(Text)
                    }
                    return item.color === Color
                })
                .sort((aa, bb) => aa.name.localeCompare(bb.name))
                .map(function (item) {
                    return (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>
                                <button
                                    className="btn btn-outline-primary"
                                    type="button"
                                    onClick={function () {
                                        showInput("please input the fileNamePattern", item.fileNamePattern)
                                            .then(function (result) {
                                                if (result.isConfirmed) {
                                                    if (result.value) {
                                                        const file = {
                                                            ...item,
                                                            directoryId: property.directoryId,
                                                            isExtra: true,
                                                            fileNamePattern: result.value,
                                                            id: item.id,
                                                        } as LB.ModuleActionFile
                                                        if (property.isTest) {
                                                            file.nameSpacePattern = property.entity.name
                                                        } else {
                                                            file.nameSpacePattern = property.ma.name
                                                        }
                                                        return makeModuleActionCRUD()
                                                            .update({
                                                                ...property.ma,
                                                                filezz: [...property.ma.filezz, file],
                                                            })
                                                            .then((item) => sFlowPageStore.setAction(item.name, item))
                                                    }
                                                }
                                            })
                                            .catch(sToastzzStore.showError)
                                    }}
                                >
                                    +
                                </button>
                            </td>
                        </tr>
                    )
                })}
        </>
    )
}
