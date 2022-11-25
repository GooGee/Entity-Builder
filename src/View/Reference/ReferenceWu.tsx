import makeTypeFormat from "@/Database/Factory/makeTypeFormat"
import useWuParameterzzStore from "@/Store/useWuParameterzzStore"
import useWuzzStore from "@/Store/useWuzzStore"
import SelectButton from "../Button/SelectButton"
import ArgumentList from "./ArgumentList"

interface Property {
    className?: string
    item: LB.TypeFormat
    wuId?: number
    update(item: LB.TypeFormat): void
}

export default function ReferenceWu(property: Property) {
    const sWuzzStore = useWuzzStore()
    const sWuParameterzzStore = useWuParameterzzStore()

    return (
        <div className={property.className}>
            <SelectButton
                className="wa inline"
                itemzz={sWuzzStore.itemzz}
                value={property.item.targetId}
                change={function (targetId) {
                    const pzz = sWuParameterzzStore.itemzz.filter(
                        (item) => item.wuId === targetId,
                    )
                    const argumentzz = [...property.item.argumentzz]
                    if (argumentzz.length < pzz.length) {
                        for (
                            let index = argumentzz.length;
                            index < pzz.length;
                            index++
                        ) {
                            argumentzz.push(makeTypeFormat())
                        }
                    } else {
                        if (argumentzz.length > pzz.length) {
                            argumentzz.splice(pzz.length)
                        }
                    }
                    property.update({
                        ...property.item,
                        targetId,
                        argumentzz,
                    })
                }}
            ></SelectButton>

            <ArgumentList
                itemzz={property.item.argumentzz}
                targetId={property.item.targetId}
                wuId={property.wuId}
                updateArgumentzz={function (argumentzz) {
                    property.update({
                        ...property.item,
                        argumentzz,
                    })
                }}
            ></ArgumentList>
        </div>
    )
}
