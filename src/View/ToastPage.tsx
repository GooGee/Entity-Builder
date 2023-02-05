import { PageEnum } from "@/menuzz"
import useToastzzStore, { Toast } from "@/Store/useToastzzStore"
import { useState } from "react"

export default function ToastPage() {
    const sToastzzStore = useToastzzStore()

    return (
        <table className="table">
            <caption>
                <h1 className="inline">{PageEnum.Toast}</h1>
                <span className="ms-3">{sToastzzStore.itemzz.length}</span>
            </caption>
            <tbody>
                {sToastzzStore.itemzz
                    .slice()
                    .reverse()
                    .map((item) => (
                        <Detail key={item.id} item={item}></Detail>
                    ))}
            </tbody>
        </table>
    )
}

interface Property {
    item: Toast
}

function Detail(property: Property) {
    const [visible, setVisible] = useState(false)

    return (
        <tr>
            <td>{property.item.date.toISOString().replace("T", " ").slice(0, 19)}</td>
            <td>
                <div onClick={() => setVisible(true)} className="pointer">
                    {property.item.text}
                </div>
                {visible ? (
                    <div>
                        <div>
                            <button
                                className="btn btn-outline-primary"
                                type="button"
                                onClick={() => setVisible(false)}
                            >
                                hide
                            </button>
                        </div>
                        {property.item.detail}
                    </div>
                ) : null}
            </td>
        </tr>
    )
}
