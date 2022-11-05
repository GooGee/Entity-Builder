import useListModalStore from "@/Store/useListModalStore"
import { useState } from "react"
import ReactModal from "react-modal"

export default function ListModal() {
    const sListModalStore = useListModalStore()

    const [text, setText] = useState("")

    return (
        <ReactModal
            isOpen={sListModalStore.isOpen}
            onRequestClose={sListModalStore.close}
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}
        >
            <h3>{sListModalStore.title}</h3>
            <div className="mb-3">
                <input
                    value={text}
                    onChange={function (event) {
                        setText(event.target.value)
                    }}
                    autoFocus
                    type="text"
                    className="form-control"
                />
            </div>
            <ul className="list-group">
                {sListModalStore.namezz
                    .filter((item) => item.includes(text))
                    .map((item) => (
                        <li
                            onClick={function () {
                                sListModalStore.close()
                                sListModalStore.callback(item)
                            }}
                            key={item}
                            className="list-group-item pointer"
                        >
                            {item}
                        </li>
                    ))}
            </ul>
        </ReactModal>
    )
}
