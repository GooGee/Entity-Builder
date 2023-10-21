import useImportModalStore from "@/Store/useImportModalStore"
import { useState } from "react"
import ReactModal from "react-modal"

export default function ImportModal() {
    const sImportModalStore = useImportModalStore()

    const [text, setText] = useState("")

    return (
        <ReactModal
            isOpen={sImportModalStore.isOpen}
            onRequestClose={sImportModalStore.close}
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}
        >
            <div className="mb-3">
                <h3 className="inline me-3">{sImportModalStore.title}</h3>
                <button
                    onClick={function () {
                        sImportModalStore.callback(text)
                    }}
                    className="btn btn-outline-primary"
                    type="button"
                >
                    import
                </button>
            </div>

            <div>
                <textarea
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    rows={11}
                    placeholder={sImportModalStore.message}
                    className="form-control"
                ></textarea>
            </div>

            <div>
                {sImportModalStore.example ? <div>example</div> : null}
                <pre className="bg-light border border-secondary">
                    {sImportModalStore.example}
                </pre>
            </div>
        </ReactModal>
    )
}
