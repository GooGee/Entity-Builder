import { makeCollectionItemCRUD } from "@/Database/makeCRUD"
import useCollectionItemzzStore from "@/Store/useCollectionItemzzStore"
import useCollectionPageStore from "@/Store/useCollectionPageStore"
import useToastzzStore from "@/Store/useToastzzStore"
import { useEffect, useState } from "react"
import CollectionItem from "./CollectionItem"
import showInput from "../Dialog/showInput"
import useImportModalStore from "@/Store/useImportModalStore"
import makeCollectionItem from "@/Database/Factory/makeCollectionItem"

const exampleText = `[
    {
        name: "dtCreate",
        tag: "datetime",
    },
    {
        name: "dtUpdate",
        tag: "datetime",
    }
]`

export default function CollectionDetail() {
    const pageStore = useCollectionPageStore()
    const store = useCollectionItemzzStore()
    const sToastzzStore = useToastzzStore()

    const [itemzz, setItemzz] = useState<LB.CollectionItem[]>([])

    useEffect(() => {
        if (pageStore.item === undefined) {
            setItemzz([])
            return
        }

        setItemzz(
            store.itemzz.filter((item) => item.collectionId === pageStore.item?.id),
        )
    }, [pageStore.item, store.itemzz])

    if (pageStore.item === undefined) {
        return null
    }

    function importJson(text: string) {
        if (text === "") {
            return
        }
        try {
            const zz = JSON.parse(text)
            if (Array.isArray(zz) === false) {
                sToastzzStore.showDanger("text is not JSON array")
                return
            }
            const data = zz.map((item: any) => {
                if (typeof item === "string") {
                    item = { name: item }
                }
                return makeCollectionItem(
                    pageStore.item!.id,
                    item["name"] ?? "",
                    item["value"] ?? "",
                    item["tag"] ?? "",
                )
            })
            makeCollectionItemCRUD().createMany(data).catch(sToastzzStore.showError)
        } catch (error) {
            sToastzzStore.showError(error)
        }
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>name</th>
                    <th>
                        value
                        {pageStore.item.valueDescription
                            ? ` (${pageStore.item.valueDescription})`
                            : ""}
                    </th>
                    <th>
                        tag
                        {pageStore.item.tagDescription
                            ? ` (${pageStore.item.tagDescription})`
                            : ""}
                    </th>
                </tr>
            </thead>
            <tbody>
                {itemzz.map((item) => (
                    <CollectionItem key={item.id} item={item}></CollectionItem>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td>
                        <button
                            onClick={() =>
                                showInput("Please input the name", "")
                                    .then((response) => {
                                        if (response.isConfirmed) {
                                            return makeCollectionItemCRUD().create(
                                                makeCollectionItem(
                                                    pageStore.item!.id,
                                                    response.value,
                                                ),
                                            )
                                        }
                                    })
                                    .catch(sToastzzStore.showError)
                            }
                            className="btn btn-outline-primary"
                            type="button"
                        >
                            +
                        </button>
                    </td>
                    <td>
                        <span
                            onClick={function () {
                                useImportModalStore
                                    .getState()
                                    .openCB(
                                        pageStore.item!.id,
                                        "import CollectionItem",
                                        undefined,
                                        importJson,
                                        exampleText,
                                    )
                            }}
                            className="btn btn-outline-primary"
                        >
                            import
                        </span>
                    </td>
                    <td></td>
                </tr>
            </tfoot>
        </table>
    )
}
